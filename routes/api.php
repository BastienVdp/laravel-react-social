<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\FriendshipController;
use App\Http\Controllers\ConversationController;

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

    Route::get('/post', [PostController::class, 'index']);
    Route::get('/post/profile/{id}', [PostController::class, 'profile']);
    Route::post('/post', [PostController::class, 'store']);


    Route::apiResource('/comment', CommentController::class);

    Route::post('/like', [LikeController::class, 'like']);
    Route::delete('/like/{likeable_id}/{likeable_type}', [LikeController::class, 'unlike']);

    Route::get('/search/{search}', [UserController::class, 'search']);
    Route::get('/users/{id}', [UserController::class, 'getUser']);


    Route::post('/friendship/send', [FriendshipController::class, 'send']);
    Route::post('/friendship/accept', [FriendshipController::class, 'accept']);
    Route::post('/friendship/deny', [FriendshipController::class, 'deny']);
    Route::post('/friendship/remove', [FriendshipController::class, 'remove']);
    Route::post('/friendship/block', [FriendshipController::class, 'block']);
    Route::post('/friendship/unblock', [FriendshipController::class, 'unblock']);

    Route::get('/friendship/mine/{recipient}', [FriendshipController::class, 'mine']);
    Route::get('/friendship/all/{recipient}', [FriendshipController::class, 'all']);
    Route::get('/friendship/accepted/{recipient}', [FriendshipController::class, 'accepted']);
    Route::get('/friendship/pending/{recipient}', [FriendshipController::class, 'pending']);
    Route::get('/friendship/denied/{recipient}', [FriendshipController::class, 'denied']);
    Route::get('/friendship/blocked/{recipient}', [FriendshipController::class, 'blocked']);
    Route::get('/friendship/mutual/{recipient}', [FriendshipController::class, 'mutual']);

    Route::get('/conversations', [ConversationController::class, 'index']);
    Route::get('/conversations/{id}', [ConversationController::class, 'show']);
    Route::get('/conversations/search/{search}', [ConversationController::class, 'search']);
    Route::post('/conversations/send', [ConversationController::class, 'send']);
    Route::post('/conversations/unread', [ConversationController::class, 'unread']);
    Route::post('/conversations/read', [ConversationController::class, 'read']);
    Route::delete('/conversations/{id}', [ConversationController::class, 'delete']);

});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
