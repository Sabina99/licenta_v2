<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Storage;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    use Notifiable;

    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register', 'forgotPassword', 'resetPassword']]);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);
        $credentials = $request->only('email', 'password');

        $token = Auth::attempt($credentials);
        if (!$token) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized',
            ], 401);
        }

        /** @var User $user */
        $user = Auth::user();
        return response()->json([
            'status' => 'success',
            'user' => array_merge(
                $user->toArray(),
                [
                    'followers' => $user->followers()->get()->count(),
                    'following' => $user->following()->get()->count()
                ]
            ),
            'authorisation' => [
                'token' => $token,
                'type' => 'bearer',
            ]
        ]);

    }

    public function edit(Request $request)
    {
        /** @var User $user */
        $user = Auth::user();

        $getImage = $request->file('new_image');
        if ($getImage) {
            $imageName = time() . '.' . $getImage->extension();

            Storage::disk('public')->put($imageName, file_get_contents($getImage));

            $user->image = '/storage/images/' . $imageName;
        }

        $data = $request->only('name', 'age', 'description');

        $user->name = $data['name'];
        $user->age = $data['age'];
        $user->description = $data['description'];
        $user->save();

        return response()->json($user->toArray());

    }

    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

        $notOk = true;

        while ($notOk) {
            $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            $charactersLength = strlen($characters);
            $randomString = '';
            for ($i = 0; $i < 3; $i++) {
                $randomString .= $characters[rand(0, $charactersLength - 1)];
            }
            $username = '@' . substr($request->name, 0, -1 * (strlen($request->name) > 3 ? strlen($request->name) - 3 : 0)) . $randomString;

            if (User::where('username', $username)) {
                $notOk = false;
            }
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'username' => $username,
            'password' => Hash::make($request->password),
        ]);

        $token = Auth::login($user);
        return response()->json([
            'status' => 'success',
            'message' => 'User created successfully',
            'user' => $user,
            'authorisation' => [
                'token' => $token,
                'type' => 'bearer',
            ]
        ]);
    }

    public function logout()
    {
        Auth::logout();
        return response()->json([
            'status' => 'success',
            'message' => 'Successfully logged out',
        ]);
    }

    public function profile()
    {
        /** @var User $user */
        $user = Auth::user();

        return response()->json([
            'status' => 'success',
            'user' => array_merge(
                $user->toArray(),
                [
                    'followers' => $user->followers()->get()->count(),
                    'following' => $user->following()->get()->count()
                ]
            ),
        ]);
    }

    public function refresh()
    {
        /** @var User $user */
        $user = Auth::user();
        return response()->json([
            'status' => 'success',
            'user' => array_merge(
                $user->toArray(),
                [
                    'followers' => $user->followers()->get()->count(),
                    'following' => $user->following()->get()->count()
                ]
            ),
            'authorisation' => [
                'token' => Auth::refresh(),
                'type' => 'bearer',
            ]
        ]);
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function users(Request $request)
    {
        /** @var User $user */
        $user = Auth::user();
        $name = $request->get('name');
        $qb = User::query()
            ->where('id', '!=', $user->id);

        if ($name) {
            $qb->where('name', 'LIKE', "%$name%");
        }

        return response()->json($qb->get()->toArray());
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function user(User $user)
    {
        return response()->json($user
            ->load('following')
            ->load('following.following')
            ->load('following.userMovies.movie')
            ->load('followers')
            ->load('userMovies')
            ->load('userMovies.movie')
            ->toArray()
        );
    }

    public function forgotPassword(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $status = Password::sendResetLink(
            $request->only('email')
        );

        return new JsonResponse(['status' => __($status)]);
    }

    public function resetPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string|min:6|confirmed',
            'password_confirmation' => 'required',
            'token' => 'required'
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->forceFill([
                    'password' => Hash::make($password)
                ])->setRememberToken(Str::random(60));

                $user->save();

                event(new PasswordReset($user));
            }
        );

        if ($status !== Password::PASSWORD_RESET) {
            return new JsonResponse(['message' => 'Invalid token!'], 404);
        }

        return new JsonResponse(['message' => 'Your password has been changed!']);
    }

}
