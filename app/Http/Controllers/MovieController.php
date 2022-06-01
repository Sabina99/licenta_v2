<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMovieRequest;
use App\Http\Requests\UpdateMovieRequest;
use App\Models\Movie;
use Illuminate\Http\JsonResponse;

class MovieController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Movie::all();
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
