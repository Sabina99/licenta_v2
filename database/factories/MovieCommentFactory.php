<?php

namespace Database\Factories;

use App\Models\Comment;
use App\Models\Movie;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MovieComment>
 */
class MovieCommentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'comment_id' => $this->faker->randomElement(Comment::all()),
            'movie_id' => $this->faker->randomElement(Movie::all())
        ];
    }
}
