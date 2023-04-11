<?php

namespace App\Models;

use App\Enums\MessageStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Conversation extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function messages()
    {
        return $this->hasMany(Message::class);
    }

    public function unreadMessages(): HasMany
    {
        return $this->hasMany(Message::class)->where('user_id', '<>', auth()->id())->where('read', MessageStatus::UNREAD);
    }
    
    public function latestMessage(): HasOne
    {
        return $this->hasOne(Message::class)->latestOfMany();
    }
    
    public function participants() {
        return $this->belongsToMany(User::class, 'conversation_participants', 'conversation_id', 'user_id');
    }

    public function scopeHasParticipants($query, Array $participants){
        foreach($participants as $id){
            $query->whereHas('participants', function($query) use ($id){
                $query->where('user_id', $id);
            });
        }
    
        return $query;
    }
}
