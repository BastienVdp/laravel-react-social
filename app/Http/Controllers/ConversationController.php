<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Events\MessageEvent;
use App\Models\Conversation;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;
use App\Actions\Message\StoreMessageAction;
use App\Http\Resources\Message\MessageResource;
use App\Interfaces\ConversationRepositoryInterface;
use App\Actions\Conversation\DeleteAllMessagesAction;
use App\Http\Resources\Conversation\ConversationResource;
use App\Http\Resources\Conversation\ConversationCollection;

class ConversationController extends Controller
{
    public function __construct(private ConversationRepositoryInterface $conversationRepository)
    {
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        return response()->json(
            new ConversationCollection(
                $this->conversationRepository
                    ->getAllConversationsForUser($request->user()->id)
            )
        );
    }

    public function search(Request $request): JsonResponse
    {
        $usersId = User::where('name', 'like', '%' . $request->search . '%')->pluck('id');

        if($usersId->isEmpty()) {
            return response()->json(['error' => 'Aucun utilisateur'], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        return response()->json(
            new ConversationCollection(
                $this->conversationRepository
                    ->getConversationsByParticipants($usersId)
            )
        );
    }

    public function show(Request $request): JsonResponse
    {
        return response()->json(
            new ConversationResource(
                $this->conversationRepository
                    ->getConversationById($request->id)
            )
        );
    }

    public function unread(Request $request): JsonResponse
    {
        $this->conversationRepository
            ->markLastMessageAsUnread($request->conversation_id, $request->user()->id);

        return response()->json('ok');
    }

    public function read(Request $request): JsonResponse
    {
        $this->conversationRepository
            ->markLastMessageAsRead($request->conversation_id, $request->user()->id);

        return response()->json('ok');
    }

    public function send(Request $request): void
    {
        $message = (new StoreMessageAction)->execute($request);

        event(new MessageEvent(
            $request->user()->id,
            $request->conversation_id,
            new MessageResource($message),
            new ConversationCollection(
                $this->conversationRepository
                    ->getAllConversationsForUser($request->user()->id)
            )
        ));
    }

    public function delete(Request $request)
    {
        (new DeleteAllMessagesAction)->execute($request->id);

        return response()->json(
            new ConversationResource(
                $this->conversationRepository
                    ->getConversationById($request->id)
            )
        );
    }
}