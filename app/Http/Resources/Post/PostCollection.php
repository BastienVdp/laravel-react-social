<?php

namespace App\Http\Resources\Post;

use Illuminate\Http\Request;
use App\Http\Resources\Post\PostResource;
use Illuminate\Http\Resources\Json\ResourceCollection;

class PostCollection extends ResourceCollection
{

    public $collects = PostResource::class;

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
