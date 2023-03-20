<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Resources\FriendshipResource;
use App\Http\Resources\UserResource;

class FriendshipController extends Controller
{

    public function myFriends(Request $request) 
    {
        return response()->json([
            'friends' => User::find($request->recipient)->getFriends()
        ]);
    }
    
    public function all(Request $request)
    {
        $all = User::find($request->recipient)->getAllFriendships();

        return response()->json([
            'all_requests' => FriendshipResource::collection($all)
        ]);

    }

    public function pending(Request $request)
    {
        $pending = User::find($request->recipient)->getFriendRequests();

        return response()->json([
            'pending_requests' => FriendshipResource::collection($pending)
        ]);

    }

    public function accepted(Request $request)
    {
        $friends = User::find($request->recipient)->getFriends();

        return response()->json([
            'friends' => UserResource::collection($friends)
        ]);

    }

    public function denied(Request $request)
    {
        $denied = User::find($request->user()->id)->getDeniedFriendships();

        return response()->json([
            'denied_requests' => $denied
        ]);

    }

    public function blocked(Request $request)
    {
        $blocked = User::find($request->user()->id)->getBlockedFriendships();

        return response()->json([
            'blocked_requests' => $blocked
        ]);

    }

    /**
     * Store a newly created resource in storage.
     */
    public function send(Request $request)
    {
        $user = User::find($request->sender);
        $recipient = User::find($request->recipient);

        $callback = $user->befriend($recipient);

        return response()->json([
            'success' => $callback
        ]);
    }

    public function accept(Request $request)
    {
        $user = User::find($request->recipient);
        $sender = User::find($request->sender);

        $callback = $user->acceptFriendRequest($sender);

        return response()->json([
            'success' => $callback
        ]);
    }

    public function deny(Request $request)
    {
        $user = User::find($request->recipient);
        $sender = User::find($request->sender);

        $callback = $user->denyFriendRequest($sender);

        return response()->json([
            'success' => $callback
        ]);
    }

    public function remove(Request $request)
    {
        $user = User::find($request->sender);
        $friend = User::find($request->recipient);

        $callback = $user->unfriend($friend);

        return response()->json([
            'success' => $callback
        ]);
    }

    public function block(Request $request)
    {
        $user = User::find($request->sender);
        $friend = User::find($request->recipient);

        $callback = $user->blockFriend($friend);

        return response()->json([
            'success' => $callback
        ]);
    }

    public function unblock(Request $request)
    {
        $user = User::find($request->sender);
        $friend = User::find($request->recipient);

        $callback = $user->unblockFriend($friend);

        return response()->json([
            'success' => $callback
        ]);
    }
}
