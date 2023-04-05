<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Events\MessageEvent;
use App\Models\Conversation;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;
use App\Actions\Message\StoreMessageAction;
use App\Http\Resources\User\UserCollection;
use App\Http\Resources\Message\MessageResource;
use App\Http\Resources\Conversation\ConversationCollection;

class ConversationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): \Illuminate\Http\JsonResponse
    {
        return response()->json(
            new ConversationCollection(
                Conversation::whereHas('participants', function ($query) use ($request) {
                    $query->where('user_id', $request->user()->id);
                })->with(['participants', 'messages'])->orderBy('created_at', 'desc')->get()
            )
        );
    }

    public function search(Request $request)
    {
        $usersId =  User::where('name', 'like', '%'.$request->search.'%')->pluck('id');

        if(count($usersId) == 0) {
            return response([
                'error' => 'Aucun utilisateur'
            ], 422);
        }

        return response()->json(
            new ConversationCollection(
                Conversation::whereHas('participants', function ($query) use ($request) {
                        $query->where('user_id', $request->user()->id);
                    })->whereHas('participants', function ($query) use ($usersId) {
                        $query->whereIn('user_id',
                            $usersId
                        );
                    })->with(['participants', 'messages'])->orderBy('created_at', 'desc')->get()
            )
        );
    }
    /**
     * Store a newly created resource in storage.
     */
    public function send(Request $request): void
    {
        $message = (new StoreMessageAction)->execute($request);

        event(new MessageEvent(
            $request->user()->id,
            $request->conversation_id,
            new MessageResource($message))
        );
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
