<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\ApplicationController;

Route::get('{view}', ApplicationController::class)->where('view', '(.*)');

Route::get('/', function () {
    return view('welcome');
});


Route::get('/api/items', [ItemController::class, 'index']);

Route::post('/api/items', [ItemController::class, 'store']);
