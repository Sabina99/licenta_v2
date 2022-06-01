<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMovieRequest;
use App\Http\Requests\UpdateMovieRequest;
use App\Models\Movie;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class MovieController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $movies = Movie::with('comments')
            ->with('comments.user')
            ->with('actors')
            ->leftJoin('user_movies', function ($leftJoin) {
                $leftJoin->on('movies.id', '=', 'user_movies.movie_id')
                    ->where('user_movies.is_liked', '=', true);
            })
            ->select('movies.*', DB::raw("count(user_movies.movie_id) as likes"))
            ->groupBy('movies.id')
            ->get()
            ->toArray();

        return $movies;
    }


    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Movie  $movie
     * @return JsonResponse
     */
    public function show(Movie $movie)
    {
        return new JsonResponse($movie);
    }
}
