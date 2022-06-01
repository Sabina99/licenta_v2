<?php

namespace App\Console\Commands;

use App\Models\Actor;
use App\Models\Movie;
use App\Models\MovieActor;
use GuzzleHttp\Client;
use Illuminate\Console\Command;

class PopulateDatabase extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'populate:database';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $client = new Client([
            'base_uri' => 'https://imdb-api.com/en/API/Top250Movies/k_f0zv63zl',
        ]);
        $client2 = new Client([
            'base_uri' => 'https://imdb-api.com/en/API/Title/k_f0zv63zl/',
        ]);
        $client3 = new Client([
            'base_uri' => 'https://imdb-api.com/en/API/Name/k_f0zv63zl/',
        ]);

        $response = $client->request('GET');
        $movies = $response->getBody();
        $movieItems = json_decode($movies->getContents())->items;

//        $idsToSearchFor = array_slice($movieItems, 0, 100);
        foreach ($movieItems as $key => $value) {
            $response2 = $client2->request('GET', "$value->id/FullActor,Posters");
            $movie = json_decode($response2->getBody()->getContents());

            $foundMovie = Movie::where('external_id', $value->id)->first();
            if ($foundMovie) {
                if (!$foundMovie->year && $movie->year) {
                    $foundMovie->update(['year' => $movie->year]);
                } elseif ($foundMovie && !$movie->year) {
                    Movie::where('external_id', $movie->id)->delete(['year' => $movie->year]);
                }
                dump("Movie {$key} found, skipping");
                continue;
            }

            dump("Handle movie {$key}/" . count($movieItems));
            if (!$movie->title || !$movie->image || !$movie->directors || !$movie->plot || !$movie->genres || !$movie->year) {
                continue;
            }

            $createdMovie = Movie::create([
                'title' => $movie->title,
                'image' => $movie->image,
                'directors' => $movie->directors,
                'plot' => $movie->plot,
                'imdb_rating' => $movie->imDbRating,
                'genres' => $movie->genres,
                'year' => $movie->year,
                'external_id' => $movie->id
            ]);

            $movieActors = $movie->actorList;
            foreach ($movieActors as $key => $value) {
                $foundActor = Actor::where('external_id', $value->id)->first();
                if ($foundActor) {
                    MovieActor::create([
                        'movie_id' => $createdMovie->id,
                        'actor_id' => $foundActor->id
                    ]);

                    dump("Actor {$key} found, skipping");

                    continue;
                }

                dump("Handle actor {$key}/" . count($movieActors) . ' ' . $value->id);
                $response3 = $client3->request('GET', "$value->id");
                $actor = json_decode($response3->getBody()->getContents());

                if (!$actor->name || !$actor->image || !$actor->summary || !$actor->birthDate) {
                    continue;
                }

                $createdActor = Actor::create([
                    'name' => $actor->name,
                    'image' => $actor->image,
                    'description' => $actor->summary,
                    'date_of_birth' => $actor->birthDate,
                    'external_id' => $actor->id
                ]);

                if (!$createdActor) {
                    dump("Actor not found {$value->id}");
                }

                MovieActor::create([
                    'movie_id' => $createdMovie->id,
                    'actor_id' => $createdActor->id
                ]);
            }
        }
    }
}
