<?php

namespace App\Http\Resources\Comment;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Resources\User\UserResource;
use Illuminate\Http\Resources\Json\JsonResource;

class CommentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'post_id' => $this->post_id,
            'user' => UserResource::make(User::find($this->user_id)),
            'body' => $this->body,
        ];
    }
}
