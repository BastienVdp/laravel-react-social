<?php

namespace App\Repositories;

use App\Enums\MessageStatus;
use App\Models\Conversation;
use App\Interfaces\ConversationRepositoryInterface;

class ConversationRepository implements ConversationRepositoryInterface
{
    public function getAllConversationsForUser($userId)
    {
        return Conversation::whereHas('participants', function ($query) use ($userId) {
            $query->where('user_id', $userId);
        })
        ->with(['participants', 'latestMessage'])
        ->latest('updated_at')
        ->get();
    }

    public function getConversationById($conversationId)
    {
        return Conversation::with(['participants', 'messages', 'latestMessage'])->findOrFail($conversationId);
    }

    public function getConversationsByParticipants($participantIds)
    {
        return Conversation::whereHas('participants', function ($query) {
                $query->where('user_id', request()->user()->id);
            })
            ->whereHas('participants', function ($query) use ($participantIds) {
                $query->whereIn('user_id', $participantIds);
            })
            ->with(['participants', 'messages'])
            ->orderBy('created_at', 'desc')
            ->get();
    }

    // public function createConversation($participants)
    // {
    //     $conversation = new Conversation();
    //     $conversation->save();

    //     foreach ($participants as $participant) {
    //         $conversation->participants()->create(['user_id' => $participant]);
    //     }

    //     return $conversation;
    // }

    // public function addMessageToConversation($conversationId, $messageData)
    // {
    //     $conversation = Conversation::findOrFail($conversationId);
    //     $message = $conversation->messages()->create($messageData);

    //     return $message;
    // }

    public function markLastMessageAsRead($conversationId, $userId)
    {
        $lastMessage = Conversation::findOrFail($conversationId)->messages()->orderBy('created_at', 'desc')->firstOrFail();
        $lastMessage->read = MessageStatus::READ;
        $lastMessage->read_by = $userId;
        $lastMessage->save();
    }

    public function markLastMessageAsUnread($conversationId, $userId)
    {
        $lastMessage = Conversation::findOrFail($conversationId)->messages()->orderBy('created_at', 'desc')->firstOrFail();
        $lastMessage->read = MessageStatus::UNREAD;
        $lastMessage->read_by = $userId;
        $lastMessage->save();
    }
}
