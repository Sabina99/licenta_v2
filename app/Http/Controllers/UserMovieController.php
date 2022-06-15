<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserMovieRequest;
use App\Http\Requests\UpdateUserMovieRequest;
use App\Models\Movie;
use App\Models\UserMovie;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
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

        if ($request->ids && count($request->ids) > 0) {
            $userIds = $request->ids;
        } else {
            $userIds = [];
        }
        $movie = UserMovie::where('user_id', $user->id)->get()->toArray();
        $sorted = collect($movie)->sortByDesc('rating');

        $stringOutput = 0;
        $userIds[] = $user->id;
        $index = 0;
        while (!$stringOutput || $index > count($sorted)) {
            $movie = Movie::where('id',  $sorted[$index]['movie_id'])->first();
            $process = new Process(['python3', base_path() . '/recommended/main.py', $movie->title, implode(',', $userIds)]);
            $process->run();

            if (!$process->isSuccessful()) {
                throw new ProcessFailedException($process);
            }

            $stringOutput = $process->getOutput();
            $index++;
        }
        return $stringOutput;

        $parts = [];
        $tok = strtok($stringOutput, " \n\t");
        while ($tok !== false) {
            $parts[] = $tok;
            $tok = strtok(" \n\t");
        }

        $movieIds = [];
        for ($i = 2; $i < count($parts); $i+=2) {
            $movieIds[] = $parts[$i];
        }

        return Movie::whereIn('id', $movieIds)->get()->toArray();
    }
}
