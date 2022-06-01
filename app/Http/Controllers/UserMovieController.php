<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserMovieRequest;
use App\Http\Requests\UpdateUserMovieRequest;
use App\Models\UserMovie;

class UserMovieController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return UserMovie::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreUserMovieRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreUserMovieRequest $request)
    {
        UserMovie::create([
            'rating' => $request->get('rating') ?? null,
            'is_liked' => $request->get('is_liked') ?? null,
            'user_id' => $request->get('user_id'),
            'movie_id' => $request->get('movie_id')
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\UserMovie  $userMovie
     * @return \Illuminate\Http\Response
     */
    public function show(UserMovie $userMovie)
    {
        return UserMovie::where('id', $userMovie->id)->get();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateUserMovieRequest  $request
     * @param  \App\Models\UserMovie  $userMovie
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateUserMovieRequest $request, UserMovie $userMovie)
    {
        UserMovie::where('id', $userMovie->id)->create([
            'rating' => $request->get('rating') ?? null,
            'is_liked' => $request->get('is_liked') ?? null,
            'user_id' => $request->get('user_id'),
            'movie_id' => $request->get('movie_id')
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\UserMovie  $userMovie
     * @return \Illuminate\Http\Response
     */
    public function destroy(UserMovie $userMovie)
    {
        //
    }
}
