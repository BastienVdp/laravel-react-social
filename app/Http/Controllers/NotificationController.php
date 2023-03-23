<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Notification;
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

    public function getNotifications()
    {
        return response()->json([
            'notifications' => 'Lorem ipsum'
        ]);
    }

    public function setRead($id)
    {
        return Notification::find($id)
            ->update(['read' => true])
            ->save();
    }


}
