<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
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
        $name = $request->get('name');
        $qb = User::query();

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
        return response()->json($user->load('followers')->load('userMovies')->load('userMovies.movie')->toArray());
    }

}
