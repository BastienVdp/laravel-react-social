<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

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
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            'user' => new UserResource(User::find($this->user_id)),
            'likes' => LikeResource::collection($this->likes)
        ];
    }
}
