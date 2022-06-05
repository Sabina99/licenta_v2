<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserMovieRequest;
use App\Http\Requests\UpdateUserMovieRequest;
use App\Models\UserMovie;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

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
     * @return JsonResponse
     */
    public function store(StoreUserMovieRequest $request)
    {
        $userId = Auth::user()->id;
        $movieId =  $request->get('movieId');
        $userMovie = UserMovie::query()
            ->where('movie_id', '=', $movieId)
            ->where('user_id', '=', $userId)
            ->first();

        if (!$userMovie) {
            $userMovie =  UserMovie::create([
                'movie_id' => $movieId,
                'user_id' => $userId
            ]);
        }

        $userMovie->rating = $request->get('rating');
        $userMovie->save();

        return new JsonResponse($userMovie);
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
