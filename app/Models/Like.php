<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Like extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function post()
    {
        return $this->belongsTo(Post::class);
    }

    public function commentable(): MorphTo
    {
        return $this->morphTo();
    }

    public function user()
    {
        return $this->belongsTo(User::class)->withDefault();
    }

    public function fillLike($recipient)
    {
        return $this->fill([
            'likeable_id' => $recipient->getKey(),
            'likeable_type' => $recipient->getMorphClass()
        ]);
    }

}
