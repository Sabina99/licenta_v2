<?php

namespace Database\Seeders;

use App\Models\Comment;
use App\Models\Follower;
use App\Models\MovieComment;
use App\Models\User;
use App\Models\UserMovie;
use Faker\Provider\Text;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class FakeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::factory()
            ->count(100)
            ->create();

        Follower::factory()
            ->count(1000)
            ->create();

        UserMovie::factory()
            ->count(1000)
            ->create();

        Comment::factory()
            ->count(1000)
            ->create();

        MovieComment::factory()
            ->count(1000)
            ->create();
    }
}
