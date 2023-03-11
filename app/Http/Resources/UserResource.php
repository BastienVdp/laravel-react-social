<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use App\Http\Resources\PostResource;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'username' => $this->name,
            'email' => $this->email,
            'avatar' => $this->avatar ?? '',
            'cover' => $this->cover ?? '',
            'city' => $this->city ?? '',
            'birthday' => $this->birthday,
            'bio' => $this->bio ?? '',
            'posts' => PostResource::collection($this->whenLoaded('posts'))
        ];
    }
}
