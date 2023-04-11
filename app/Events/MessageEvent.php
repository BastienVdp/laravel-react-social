<?php

namespace App\Events;

use App\Http\Resources\Conversation\ConversationCollection;
use App\Http\Resources\Conversation\ConversationResource;
use App\Http\Resources\Message\MessageResource;
use App\Models\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class MessageEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */
    public function __construct(
        public int $user_id,
        public int $conversation_id,
        public MessageResource $message,
        public ConversationCollection $conversations
    )
    {
        
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('channel.user-'.$this->user_id),
            new PrivateChannel('channel.conv-'.$this->conversation_id),
        ];
    }

    public function broadcastAs()
    {
        return 'MessageSent';
    }
}
