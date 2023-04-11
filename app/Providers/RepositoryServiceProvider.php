<?php

namespace App\Providers;

use App\Interfaces\ConversationRepositoryInterface;
use App\Repositories\ConversationRepository;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        $this->app->bind(ConversationRepositoryInterface::class, ConversationRepository::class);
    }
}
