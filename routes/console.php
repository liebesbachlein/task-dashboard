<?php

use App\Console\Commands\SendEmails;
use App\Console\Commands\SendNotification;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use App\Http\Controllers\MailController;
use Illuminate\Support\Facades\Schedule;
 
Schedule::command(SendNotification::class)->everyMinute();



