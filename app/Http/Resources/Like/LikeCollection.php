<?php

namespace App\Http\Resources\Like;

use Illuminate\Http\Request;
use App\Http\Resources\Like\LikeResource;
use Illuminate\Http\Resources\Json\ResourceCollection;

class LikeCollection extends ResourceCollection
{

    public $collects = LikeResource::class;

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
