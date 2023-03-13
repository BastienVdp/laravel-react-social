<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;

class UserController extends Controller
{
    public function getUser(Request $request) {
        return new UserResource(User::with('posts')->find($request->id));
    }

    public function search(Request $request) {
        return UserResource::collection(
            User::where('name', 'like', '%'.$request->search.'%')->get()
        );
    }

    // public function getFriendsRequests(Request $request) {
    //     $user = User::find($request->user()->id);
    //     $requests = $user->getFriendRequests();

    //     return response()->json([
    //         'friends_requests' => $requests
    //     ]);
    // }
}
