<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function index(Request $request) {
        $user = User::find($request->user()->id);
        $requests = $user->getFriendRequests();

        return response()->json([
            'friendRequests' => $requests
        ]);
    }
}
