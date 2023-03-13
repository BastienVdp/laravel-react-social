<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\FriendshipController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::apiResource('/post', PostController::class);

    Route::post('/like', [LikeController::class, 'like']);
    Route::delete('/like/{id}', [LikeController::class, 'unlike']);

    Route::get('/search/{search}', [UserController::class, 'search']);
    Route::get('/users/{id}', [UserController::class, 'getUser']);


    Route::post('/friendship/send', [FriendshipController::class, 'send']);
    Route::post('/friendship/accept', [FriendshipController::class, 'accept']);
    Route::post('/friendship/deny', [FriendshipController::class, 'deny']);
    Route::post('/friendship/remove', [FriendshipController::class, 'remove']);
    Route::post('/friendship/block', [FriendshipController::class, 'remove']);
    Route::post('/friendship/unblock', [FriendshipController::class, 'remove']);

    Route::get('/friendship/all/{recipient}', [FriendshipController::class, 'all']);
    Route::get('/friendship/accepted/{recipient}', [FriendshipController::class, 'accepted']);
    Route::get('/friendship/pending/{recipient}', [FriendshipController::class, 'pending']);
    Route::get('/friendship/denied/{recipient}', [FriendshipController::class, 'denied']);
    Route::get('/friendship/blocked/{recipient}', [FriendshipController::class, 'blocked']);

});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
