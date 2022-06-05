<?php

namespace Database\Factories;

use App\Models\Movie;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\UserMovie>
 */
class UserMovieFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'user_id' => $this->faker->randomElement(User::all()),
            'movie_id' => $this->faker->randomElement(Movie::all()),
            'rating' => $this->faker->numberBetween(1, 5),
            'is_liked' => $this->faker->randomElement([0, 1, null])
        ];
    }
}
