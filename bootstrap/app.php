<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Throwable;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        // Daftarkan middleware global untuk grup web
        $middleware->web(append: [
            \App\Http\Middleware\CheckMaintenanceMode::class,
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->respond(function ($response, Throwable $exception, Request $request) {
            // Tambahkan 503 ke dalam array ini
            if (in_array($response->getStatusCode(), [403, 404, 500, 503])) {
                return Inertia::render('error', [
                    'status' => $response->getStatusCode(),
                    'message' => $exception->getMessage(),
                ])->toResponse($request)->setStatusCode($response->getStatusCode());
            }

            return $response;
        });
    })->create();