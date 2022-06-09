<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserMovie extends Model
{
    use HasFactory;

    protected $fillable = ['rating', 'is_liked', 'user_id', 'movie_id'];

    public function movie(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(Movie::class, 'id', 'movie_id');
    }

}
