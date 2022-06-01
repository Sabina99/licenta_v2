<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMovieActorRequest;
use App\Http\Requests\UpdateMovieActorRequest;
use App\Models\MovieActor;

class MovieActorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreMovieActorRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreMovieActorRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\MovieActor  $movieActor
     * @return \Illuminate\Http\Response
     */
    public function show(MovieActor $movieActor)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\MovieActor  $movieActor
     * @return \Illuminate\Http\Response
     */
    public function edit(MovieActor $movieActor)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateMovieActorRequest  $request
     * @param  \App\Models\MovieActor  $movieActor
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateMovieActorRequest $request, MovieActor $movieActor)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\MovieActor  $movieActor
     * @return \Illuminate\Http\Response
     */
    public function destroy(MovieActor $movieActor)
    {
        //
    }
}
