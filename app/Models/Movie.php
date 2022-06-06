<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Movie extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'image', 'directors', 'plot', 'imdb_rating', 'genres', 'external_id', 'year', 'image_src'];

    public function actors(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(Actor::class, 'movie_actors', 'movie_id','actor_id');
    }

    public function comments(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(Comment::class, 'movie_comments', 'movie_id','comment_id');
    }

//    public function actors(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
//    {
//        return $this->belongsToMany(Actor::class, 'movie_actors', 'movie_id','actor_id');
//    }
}
