<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

use Laravel\Sail\Console\InstallCommand;
use Courier\Console\Commands\NetworkCommand;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
       
    }
}
