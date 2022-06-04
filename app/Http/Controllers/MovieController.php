<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMovieRequest;
use App\Http\Requests\UpdateMovieRequest;
use App\Models\Movie;
use App\Models\UserMovie;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

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
            ->select('movies.*')
            ->addSelect(DB::raw("count(CASE WHEN `user_movies`.`is_liked` = true THEN 1 END) as likes"))
            ->addSelect(DB::raw("count(CASE WHEN `user_movies`.`is_liked` = false THEN 1 END) as dislikes"))
            ->addSelect(DB::raw("(SELECT us.is_liked FROM user_movies us WHERE us.user_id = 2 AND movies.id = us.movie_id) AS liked"))
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

    /**
     * @param Movie $movie
     * @param $status
     * @return JsonResponse
     */
    public function likeMovie(Movie $movie, $status)
    {
        $userId = Auth::user()->id;
        $userMovie = UserMovie::query()
            ->where('movie_id', '=', $movie->id)
            ->where('user_id', '=', $userId)
            ->first();

        if (!$userMovie) {
            $userMovie =  UserMovie::create([
                'movie_id' => $movie->id,
                'user_id' => $userId
            ]);
        }

        $userMovie->is_liked = $status;
        $userMovie->save();

        return new JsonResponse($userMovie->toArray());
    }
}
