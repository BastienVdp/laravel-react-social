<?php

namespace App\Http\Resources\Comment;

use App\Http\Resources\Like\LikeCollection;
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
            'id' => $this->id,
            'post_id' => $this->post_id,
            'user' => UserResource::make(User::find($this->user_id)),
            'likes' => new LikeCollection($this->likes),
            'body' => $this->body,
        ];
    }
}
