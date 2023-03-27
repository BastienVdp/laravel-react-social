<?php

namespace App\Http\Resources\Post;

use Illuminate\Http\Request;
use App\Http\Resources\Post\PostResource;
use App\Http\Resources\PaginationResource;
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
        $pagination = new PaginationResource($this);

        return [
            'posts' => $this->collection,
            'pagination' => $pagination,
        ];
    }
}
