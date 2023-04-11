<?php

namespace App\Http\Resources\Message;

use App\Models\User;
use Carbon\CarbonInterface;
use Illuminate\Http\Request;
use App\Http\Resources\User\UserResource;
use Illuminate\Http\Resources\Json\JsonResource;

class MessageResource extends JsonResource
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
            'content' => $this->content,
            'read' => $this->read,
            'user' => new UserResource(User::find($this->user_id)),
            'created_at' => $this->created_at->diffForHumans()
        ];
    }
}
