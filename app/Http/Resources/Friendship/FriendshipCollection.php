<?php

namespace App\Http\Resources\Friendship;

use App\Http\Resources\Friendship\FriendshipResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class FriendshipCollection extends ResourceCollection
{

    public $collects = FriendshipResource::class;

    /**
     * Transform the resource into a collection.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
           'data' => $this->collection
        ];
    }
}
