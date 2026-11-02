<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class SystemHealthController extends Controller
{
    public function index()
    {
        // Proteksi hak akses
        Gate::authorize('health.view');

        // 1. Pengujian Database Status & Latency
        $dbStatus = 'OK';
        $dbLatency = 0;
        try {
            $startTime = microtime(true);
            DB::select('SELECT 1');
            $dbLatency = round((microtime(true) - $startTime) * 1000, 2);
        } catch (\Exception $e) {
            $dbStatus = 'ERROR';
        }

        // 2. Pengukuran Ruang Penyimpanan (Disk Space)
        $diskPath = storage_path();
        $totalSpace = @disk_total_space($diskPath) ?: 1;
        $freeSpace = @disk_free_space($diskPath) ?: 0;
        $usedSpace = $totalSpace - $freeSpace;
        $usedPercentage = round(($usedSpace / $totalSpace) * 100, 1);

        // Helper konversi Byte ke Gigabyte (GB)
        $formatBytesToGB = fn($bytes) => round($bytes / (1024 * 1024 * 1024), 2);

        $healthData = [
            'database' => [
                'status' => $dbStatus,
                'latency_ms' => $dbLatency,
                'connection' => config('database.default'),
            ],
            'storage' => [
                'total_gb' => $formatBytesToGB($totalSpace),
                'used_gb' => $formatBytesToGB($usedSpace),
                'free_gb' => $formatBytesToGB($freeSpace),
                'used_percentage' => $usedPercentage,
            ],
            'system' => [
                'php_version' => PHP_VERSION,
                'laravel_version' => app()->version(),
                'environment' => config('app.env'),
                'debug_mode' => config('app.debug'),
                'timezone' => config('app.timezone'),
                'cache_driver' => config('cache.default'),
            ],
        ];

        return Inertia::render('health/index', [
            'health' => $healthData,
        ]);
    }
}