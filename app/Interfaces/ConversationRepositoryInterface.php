<?php

namespace App\Interfaces;

interface ConversationRepositoryInterface
{
    public function getAllConversationsForUser($userId);

    public function getConversationById($conversationId);

    public function getConversationsByParticipants($participantIds);

    // public function createConversation($participants);

    // public function addMessageToConversation($conversationId, $messageData);

    public function markLastMessageAsRead($conversationId, $userId);

    public function markLastMessageAsUnread($conversationId, $userId);
}
