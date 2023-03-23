<?php

namespace App\Http\Resources\User;

use Illuminate\Http\Request;
use App\Http\Resources\User\UserResource;
use Illuminate\Http\Resources\Json\ResourceCollection;

class UserCollection extends ResourceCollection
{

    public $collects = UserResource::class;

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
