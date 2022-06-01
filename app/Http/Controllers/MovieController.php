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
        return Movie::with('comments')
            ->with('comments.user')
            ->with('actors', function ($qb) {
                $qb->take(20);
            })
            ->leftJoin('user_movies', function ($leftJoin) {
                $leftJoin->on('movies.id', '=', 'user_movies.movie_id');
            })
            ->select('movies.*', DB::raw("count(CASE WHEN `user_movies`.`is_liked` = true THEN 1 END) as likes"))
            ->addSelect('movies.*', DB::raw("count(CASE WHEN `user_movies`.`is_liked` = false THEN 1 END) as dislikes"))
            ->groupBy('movies.id')
            ->get()
            ->toArray();
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
