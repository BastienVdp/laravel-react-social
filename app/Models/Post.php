<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function images()
    {
        return $this->hasMany(Image::class);
    }

    public function likes()
    {
        return $this->morphMany(Like::class, 'likeable');
    }

    public function my_likes()
    {
        return $this->hasMany(Like::class)->where('user_id', $this->auth()->id);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
