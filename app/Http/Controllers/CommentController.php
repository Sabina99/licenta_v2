<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCommentRequest;
use App\Http\Requests\UpdateCommentRequest;
use App\Models\Comment;
use App\Models\Movie;
use App\Models\MovieActor;
use App\Models\MovieComment;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Comment::all();
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param Movie $movie
     * @param \App\Http\Requests\StoreCommentRequest $request
     * @return JsonResponse
     */
    public function store(Movie $movie, StoreCommentRequest $request)
    {
        $comment = Comment::create([
            'movie_id' => $movie->id,
            'user_id' => Auth::user()->id,
            'comment' => $request->get('comment')
        ]);

        MovieComment::create([
            'movie_id' => $movie->id,
            'comment_id' => $comment->id,
            'comment' => $request->get('comment')
        ]);

        return new JsonResponse($comment);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Comment  $comment
     * @return \Illuminate\Http\Response
     */
    public function show(Movie $movie)
    {
        return Comment::where('movie_id', $movie->id)->get();
    }
}
