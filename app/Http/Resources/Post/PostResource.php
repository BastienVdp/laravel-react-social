<?php

namespace App\Http\Resources\Post;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Resources\User\UserResource;
use App\Http\Resources\Like\LikeCollection;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Comment\CommentCollection;

class PostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // return parent::toArray($request);
        return [
            'id' => $this->id,
            'content' => $this->content,
            'images' => $this->images,
            'created_at' => $this->created_at->diffForHumans(),
            'user' => new UserResource($this->user),
            'likes' => new LikeCollection($this->likes),
            'comments' => new CommentCollection($this->comments),
        ];
    }
}
