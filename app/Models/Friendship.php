<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Friendship extends Model
{
    use HasFactory;

    public $timestamps = true;

    protected $guarded = ['id', 'created_at', 'updated_at'];

    public function sender()
    {
        return $this->morphTo('sender');
    }

    public function recipient()
    {
        return $this->morphTo('recipient');
    }

    public function fillRecipient($recipient)
    {
        return $this->fill([
            'recipient_id' => $recipient->getKey(),
            'recipient_type' => $recipient->getMorphClass()
        ]);
    }

    /**
     * > This function returns a query that filters the results to only include notifications that are
     * associated with the given model
     *
     * @param query The query builder instance.
     * @param model The model that you want to find the notifications for.
     *
     * @return A query builder object.
     */
    public function scopeWhereRecipient($query, $model)
    {
        return $query->where('recipient_id', $model->getKey())
            ->where('recipient_type', $model->getMorphClass());
    }

   /**
    * > This function will return a query that will return all the messages that were sent by the model
    * that is passed to the function
    *
    * @param query The query builder instance.
    * @param model The model that you want to get the notifications for.
    *
    * @return A query builder instance.
    */
    public function scopeWhereSender($query, $model)
    {
        return $query->where('sender_id', $model->getKey())
            ->where('sender_type', $model->getMorphClass());
    }

    /**
     * It takes a query, and two models, and returns a query that has been filtered to only include
     * messages between those two models
     *
     * @param query The query builder instance.
     * @param sender The sender of the message
     * @param recipient The user who is receiving the message
     */
    public function scopeBetweenModels($query, $sender, $recipient)
    {
        $query->where(function ($queryIn) use ($sender, $recipient){
            $queryIn->where(function ($q) use ($sender, $recipient) {
                $q->whereSender($sender)->whereRecipient($recipient);
            })->orWhere(function ($q) use ($sender, $recipient) {
                $q->whereSender($recipient)->whereRecipient($sender);
            });
        });
    }
}
