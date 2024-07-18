<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\MenuItemController;
use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\UserAccountController;
use App\Http\Controllers\AdminAccountController;
use App\Http\Controllers\NotificationController;

Route::middleware(['auth:web'])->group(function () {
    Route::any('/user/{any?}', [UserAccountController::class, 'index'])->where('any', '.*');
    Route::post('/api/user/notification', [NotificationController::class, 'store']);
    Route::delete('/api/user/notification/{id}', [NotificationController::class, 'destroy']);
    Route::get('/api/accounts/{id}', [NotificationController::class, 'showNotifications']);
    Route::get('/api/accounts', [NotificationController::class, 'emails']);

    Route::get('/api/notification', [NotificationController::class, 'index']);
    Route::get('/api/notification/emails', [NotificationController::class, 'emails']);
    Route::get('/api/user/notification/emails/{user_id}', [NotificationController::class, 'showNotificationByEmail']);


    Route::get('/api/user/me', function (Request $request) {
        return $request->user();
    });
});

Route::post('/users/logout', [UserAccountController::class, 'logout']);


Route::middleware(['auth:admin'])->group(function () {
    Route::any('/admin/{any?}', [AdminAccountController::class, 'index'])->where('any', '.*');
    
    Route::post('/api/menu-items', [MenuItemController::class, 'store']);
    Route::delete('/api/menu-items/{id}', [MenuItemController::class, 'destroy']);
    Route::put('/api/menu-items/{id}', [MenuItemController::class, 'update']);
    
    Route::post('/api/categories', [CategoryController::class, 'store']);
    Route::delete('/api/categories/{id}', [CategoryController::class, 'destroy']);
    Route::put('/api/categories/{id}', [CategoryController::class, 'update']);
    
    Route::post('/api/events', [EventController::class, 'store']);
    Route::delete('/api/events/{id}', [EventController::class, 'destroy']);
    Route::put('/api/events/{id}', [EventController::class, 'update']);
    
    Route::post('/api/notification', [NotificationController::class, 'store']);
    Route::delete('/api/notification/{id}', [NotificationController::class, 'destroy']);
    Route::get('/api/notification', [NotificationController::class, 'index']);
    Route::get('/api/notification/emails', [NotificationController::class, 'emails']);
    Route::get('/api/notification/emails/{user_id}', [NotificationController::class, 'showNotificationByEmail']);

    Route::delete('/api/account/{id}', [UserController::class, 'destroy']);
});

Route::get('/api/all', [CategoryController::class, 'all']);

Route::get('/api/menu-items', [MenuItemController::class, 'index']);
Route::get('/api/menu-items/{id}', [MenuItemController::class, 'show']);
Route::get('/api/menu-items/events/{routeName}', [MenuItemController::class, 'events']);

Route::get('/api/categories', [CategoryController::class, 'index']);
Route::get('/api/categories/{id}', [CategoryController::class, 'show']);
Route::get('/api/categories/{id}/menu-items', [CategoryController::class, 'menuItems']);

Route::get('/api/events', [EventController::class, 'index']);
Route::get('/api/events/{id}', [EventController::class, 'show']);


Route::post('/users/register', [UserController::class, 'store']);
Route::post('/users/login', [UserAccountController::class, 'login']);

Route::post('/admins/register', [AdminController::class, 'store']);
Route::post('/admins/login', [AdminAccountController::class, 'login']);
Route::post('/admins/logout', [AdminAccountController::class, 'logout']);

Route::get('/login', [UserAccountController::class, 'index'])->name('login');
Route::get('/admin-login', [AdminAccountController::class, 'index'])->name('admin-login');

Route::get('{view}', ApplicationController::class)->where('view', '(.*)');
