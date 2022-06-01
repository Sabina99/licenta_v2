<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreFollowerRequest;
use App\Http\Requests\UpdateFollowerRequest;
use App\Models\Follower;
use App\Models\User;

class FollowerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(User $user)
    {
        return Follower::where('user_id', $user->id)->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreFollowerRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(User $user, StoreFollowerRequest $request)
    {
        Follower::create([
            'user_id' => $user->id,
            'follow_id' => $request->get('follow_id')
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Follower  $follower
     * @return \Illuminate\Http\Response
     */
    public function show(Follower $follower)
    {
        return Follower::where('id', $follower->id);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Follower  $follower
     * @return \Illuminate\Http\Response
     */
    public function destroy(Follower $follower)
    {
        Follower::destroy($follower->id);
    }
}
