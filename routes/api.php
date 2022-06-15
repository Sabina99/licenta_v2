<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware' => ['json.response']], function () {
    Route::post('login', 'App\Http\Controllers\Auth\AuthController@login')->name('login.api');
    Route::post('register','App\Http\Controllers\Auth\AuthController@register')->name('register.api');
    Route::get('profile','App\Http\Controllers\Auth\AuthController@profile')->name('profile.api');


    Route::middleware('auth:api')->group(function() {
        Route::post('logout', 'App\Http\Controllers\Auth\AuthController@logout')->name('logout.api');
        Route::post('refresh', 'App\Http\Controllers\Auth\AuthController@refresh')->name('refresh.api');
        Route::post('user/edit', 'App\Http\Controllers\Auth\AuthController@edit')->name('edit.api');
        Route::get('users', 'App\Http\Controllers\Auth\AuthController@users')->name('users.index');
        Route::get('user/{user}', 'App\Http\Controllers\Auth\AuthController@user')->name('user.index');

        Route::get('movies', 'App\Http\Controllers\MovieController@index')->name('movies.index');
        Route::get('movies/{movie}', 'App\Http\Controllers\MovieController@show')->name('movies.show');
        Route::post('movies/{movie}/{status}', 'App\Http\Controllers\MovieController@likeMovie')->name('movies.like');
        Route::get('comments', 'App\Http\Controllers\CommentController@index')->name('comments.index');
        Route::post('comments/{movie}', 'App\Http\Controllers\CommentController@store')->name('comments.store');


        Route::post('recommendations', 'App\Http\Controllers\UserMovieController@recommended');

        Route::post('rating', 'App\Http\Controllers\UserMovieController@store')->name('user_movie.store');
        Route::post('rating', 'App\Http\Controllers\UserMovieController@store')->name('user_movie.store');
        Route::put('rating', 'App\Http\Controllers\UserMovieController@update')->name('user_movie.update');


        Route::get('following', 'App\Http\Controllers\FollowerController@following')->name('following.index');
        Route::post('unfollow/{user}', 'App\Http\Controllers\FollowerController@unfollow')->name('unfollow.api');
        Route::post('follow/{user}', 'App\Http\Controllers\FollowerController@store')->name('follow.store');

        Route::get('followers/{user}', 'App\Http\Controllers\FollowerController@index')->name('followers.index');
        Route::get('followers/{follower}', 'App\Http\Controllers\FollowerController@index')->name('followers.show');
        Route::delete('followers/{follower}', 'App\Http\Controllers\FollowerController@destroy')->name('followers.destroy');

  });

});
