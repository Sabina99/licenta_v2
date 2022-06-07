<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreFollowerRequest;
use App\Http\Requests\UpdateFollowerRequest;
use App\Models\Follower;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class FollowerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index(User $user)
    {
        return Follower::where('follow_id', $user->id)->get();
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function following()
    {
        /** @var User $user */
        $user = Auth::user();

        return Follower::where('user_id', $user->id)->with('follow')->with('follow.followers')->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store(User $user)
    {
        $loggedInUser = Auth::user();

        Follower::create([
            'user_id' => $loggedInUser->id,
            'follow_id' => $user->id
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param Follower $follower
     * @return Response
     */
    public function show(Follower $follower)
    {
        return Follower::where('id', $follower->id);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Follower $follower
     * @return Response
     */
    public function destroy(Follower $follower)
    {
        Follower::destroy($follower->id);
    }

    /**
     *
     * @param User $user
     * @return JsonResponse
     */
    public function unfollow(User $user)
    {
        $loggedInUser = Auth::user();

        Follower::query()
            ->where('follow_id', '=', $user->id)
            ->where('user_id', '=', $loggedInUser->id)
            ->delete();

        return new JsonResponse();
    }
}
