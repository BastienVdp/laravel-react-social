<?php

namespace App\Http\Resources\User;

use Illuminate\Http\Request;
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
            'bio' => $this->bio,
            'avatar' => $this->avatar,
            'cover' => $this->cover,
            'birthday' => $this->birthday,
            'posts' => $this->whenLoaded('posts'),
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
        ];
    }
}