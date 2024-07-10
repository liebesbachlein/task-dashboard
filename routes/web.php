<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\MenuItemController;
use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\CategoryController;


Route::get('/api/all', [CategoryController::class, 'all']);

Route::post('/api/menu-items', [MenuItemController::class, 'store']);
Route::get('/api/menu-items', [MenuItemController::class, 'index']);
Route::get('/api/menu-items/{id}', [MenuItemController::class, 'show']);
Route::get('/api/menu-items/{id}/events', [MenuItemController::class, 'events']);
Route::delete('/api/menu-items/{id}', [MenuItemController::class, 'destroy']);
Route::put('/api/menu-items/{id}', [MenuItemController::class, 'update']);

Route::post('/api/categories', [CategoryController::class, 'store']);
Route::get('/api/categories', [CategoryController::class, 'index']);
Route::get('/api/categories/{id}', [CategoryController::class, 'show']);
Route::get('/api/categories/{id}/menu-items', [CategoryController::class, 'menuItems']);
Route::delete('/api/categories/{id}', [CategoryController::class, 'destroy']);
Route::put('/api/categories/{id}', [CategoryController::class, 'update']);

Route::post('/api/events', [EventController::class, 'store']);
Route::get('/api/events', [EventController::class, 'index']);
Route::get('/api/events/{id}', [EventController::class, 'show']);
Route::delete('/api/events/{id}', [EventController::class, 'destroy']);
Route::put('/api/events/{id}', [EventController::class, 'update']);

Route::get('{view}', ApplicationController::class)->where('view', '(.*)');


//Route::post('/login')