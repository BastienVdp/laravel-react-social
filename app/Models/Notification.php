<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;

    public function from()
    {
        return $this->belongsTo(User::class, 'from');
    }

    public function to()
    {
        return $this->belongsTo(User::class, 'to');
    }

    public function scopeUnread($q)
    {
        return $q->where('read', false);
    }
}
