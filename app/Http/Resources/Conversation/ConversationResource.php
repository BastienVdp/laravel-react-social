<?php

namespace App\Http\Resources\Conversation;

use App\Models\User;
use App\Models\Message;
use Illuminate\Http\Request;
use App\Http\Resources\User\UserResource;
use App\Http\Resources\User\UserCollection;
use App\Http\Resources\Message\MessageResource;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Message\MessageCollection;

class ConversationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'latestMessage' => new MessageResource($this->whenLoaded('latestMessage')),
            'messages' => new MessageCollection($this->whenLoaded('messages')),
            'participants' => new UserCollection($this->whenLoaded('participants')),
            'messages_count' => $this->messages->count(),
        ];
    }
}
