<?php

namespace App\Console\Commands;

use App\Models\Movie;
use GuzzleHttp\Client;
use Illuminate\Console\Command;

class DownloadImageMovies extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'download:image:movies';

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
        $movies = Movie::all();

        foreach ($movies as $index => $movie) {
            dump("Handling {$index}/{$movies->count()}");
            if ($movie->image_src) {
                continue;
            }
            $client = new Client([
                'base_uri' => $movie->image,
            ]);

            $dir = storage_path('app') . '/public/images/';
            if (!is_dir($dir)) {
                mkdir( $dir , 0755, true);
            }

            $imageName = $index . time() . '.jpg';
            $client->request('GET', '', ['sink' => $dir . $imageName]);
            $movie->image_src = '/storage/images/' . $imageName;
            $movie->save();
        }

        dump('done');
    }
}
