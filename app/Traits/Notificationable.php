<?php

namespace App\Traits;

use App\Models\Notification;


trait Notificationable
{
    public function notifications()
    {
        return $this->hasMany(Notification::class, 'to')
            ->with('from')
            ->orderBy('created_at', 'DESC');
    }

    public function unreadNotifications()
    {
        return $this->hasMany(Notification::class, 'to')
            ->with('from')
            ->unread()
            ->orderBy('created_at', 'DESC');
    }
}
