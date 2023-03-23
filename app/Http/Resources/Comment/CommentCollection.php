<?php

namespace App\Http\Resources\Comment;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class CommentCollection extends ResourceCollection
{

    public $collects = CommentResource::class;

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
