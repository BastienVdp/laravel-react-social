<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Message;
use App\Events\MessageEvent;
use App\Models\Conversation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Query\JoinClause;
use Illuminate\Contracts\Database\Query\Builder;
use App\Http\Resources\Conversation\ConversationResource;
use App\Http\Resources\Conversation\ConversationCollection;
use App\Http\Resources\Message\MessageResource;

class ConversationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        
        $user = User::find($request->user()->id);
        $conversation = $user->conversations()->with(['participants', 'messages' => function($q) {
            $q->orderBy('messages.created_at', 'asc');
        }])->get();
    
                                    
        return response()->json(
            new ConversationCollection($conversation),
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function send(Request $request)
    {
        $message = Message::create([
            'content' => $request->content,
            'conversation_id' => $request->conversation_id,
            'user_id' => $request->user()->id
        ]);

        $user = $request->user();
        $conversation = $user->conversations()->with(['participants', 'messages' => function($q) {
            $q->orderBy('messages.created_at', 'asc');
        }])->wherePivot('conversation_id', $request->conversation_id)
            ->get();

        event(new MessageEvent($user->id, $request->conversation_id, new MessageResource($message)));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
