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


    Route::middleware('auth:api')->group(function() {
        Route::post('logout', 'App\Http\Auth\AuthController@logout')->name('logout.api');
        Route::get('movies', 'App\Http\Controllers\MovieController@index')->name('movies.index');
        Route::get('movies/{movie}', 'App\Http\Controllers\MovieController@show')->name('movies.show');
        Route::get('comments', 'App\Http\Controllers\CommentController@index')->name('comments.index');
        Route::post('comments/{movie}', 'App\Http\Controllers\CommentController@store')->name('comments.store');

        Route::post('rating', 'App\Http\Controllers\UserMovieController@store')->name('user_movie.store');
        Route::put('rating', 'App\Http\Controllers\UserMovieController@update')->name('user_movie.update');

        Route::get('followers/{user}', 'App\Http\Controllers\FollowerController@index')->name('followers.index');
        Route::get('followers/{follower}', 'App\Http\Controllers\FollowerController@index')->name('followers.show');
        Route::post('followers/{user}', 'App\Http\Controllers\FollowerController@store')->name('followers.store');
        Route::delete('followers/{follower}', 'App\Http\Controllers\FollowerController@destroy')->name('followers.destroy');

  });

});
