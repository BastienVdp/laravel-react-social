<?php

namespace App\Http\Resources\Like;

use App\Models\Post;
use App\Models\User;
use App\Models\Comment;
use Illuminate\Http\Request;
use App\Http\Resources\Post\PostResource;
use App\Http\Resources\User\UserResource;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Database\Eloquent\Relations\Relation;

class LikeResource extends JsonResource
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
            'likeable_id' => $this->likeable_id,
            'likeable_type' => $this->likeable_type,
            'user' => new UserResource(User::find($this->user_id))
        ];
    }
}
