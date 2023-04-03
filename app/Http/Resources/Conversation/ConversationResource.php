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
        // Message::where('conversation_id', '=', $this->id)
        //                         ->orderBy('created_at', 'DESC')
        //                         ->get()
        //                         ->unique('conversation_id')
        //                         ->values()
        //                         ->take(1)
        return [
            'id' => $this->id,
            'name' => $this->name,
            'last_message' => new MessageResource($this->whenLoaded('last_message')),
            'messages' => new MessageCollection($this->whenLoaded('messages')),
            'participants' => new UserCollection($this->whenLoaded('participants'))
        ];
    }
}
