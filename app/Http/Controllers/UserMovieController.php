<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserMovieRequest;
use App\Http\Requests\UpdateUserMovieRequest;
use App\Models\Movie;
use App\Models\UserMovie;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Symfony\Component\Process\Process;

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

    public function show(Request $request)
    {
        return UserMovie::query()
            ->where('movie_id', '=', $request->get("movieId"))
            ->first();
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

    public function recommended(Request $request)
    {
        $user = Auth::user();

        if ($request->type === 'my-preferences') {
            $userMovie = UserMovie::query()
                ->where('user_id', '=', $user->id)
                ->where('is_liked', '=',1)
                ->where('rating', '!=', 'NULL')
                ->orderBy('rating', 'DESC')
                ->first();

            if (!$userMovie) {
                return Movie::inRandomOrder()->take(10)->get();
            }

            $movie = $userMovie->movie;

            $gender = explode(',', $movie->genres)[0];
            $director = explode(',', $movie->directors)[0];

            $results = [];
            $genderMovies = collect(Movie::query()
                ->where('genres', 'LIKE', "%{$gender}%")
                ->get()
                ->toArray());

            $directorMovies = collect(Movie::query()
                ->where('directors', 'LIKE', "%{$director}%")
                ->get()
                ->toArray());

            foreach ($genderMovies as $genderMovie) {
                foreach ($directorMovies as $directorMovie) {
                    if (isset($results[$genderMovie['id']])) {
                        $results[$genderMovie['id']]++;
                    } else {
                        $results[$genderMovie['id']] = 1;
                    }

                    if (isset($results[$directorMovie['id']])) {
                        $results[$directorMovie['id']]++;
                    } else {
                        $results[$directorMovie['id']] = 1;
                    }
                }
            }

            arsort($results);

            $results = array_slice(array_keys($results), 0, 10);

            return Movie::query()->whereIn('id', $results)->get();
        }

        if ($request->type === 'friends-ratings') {
            $movies = DB::table('user_movies')
                ->select(DB::raw('SUM(rating) AS sumRating'), 'movie_id')
                ->whereIn('user_id', [...$request->get('users'), $user->id])
                ->where('is_liked', '=', '1')
                ->where('rating', '!=', 'NULL')
                ->groupBy('movie_id')
                ->orderBy('sumRating', 'DESC')
                ->take(10)
                ->get();

            return Movie::query()->whereIn('id', $movies->pluck('movie_id'))->get();
        }

        return new JsonResponse();
    }
}
