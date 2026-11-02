<?php

namespace App\Http\Middleware;

use App\Models\Setting;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckMaintenanceMode
{
    public function handle(Request $request, Closure $next): Response
    {
        // 1. Selalu izinkan akses ke URL login (GET/POST) dan logout
        // Menggunakan ->is() untuk mencocokkan path URL secara absolut
        if ($request->is('login', 'logout', 'password/*')) {
            return $next($request);
        }

        // 2. Cek apakah Mode Pemeliharaan sedang aktif
        if (Setting::get('maintenance_mode') === '1') {
            
            // 3. Jika pengguna adalah Super Admin, biarkan lewat
            if (auth()->check() && auth()->user()->hasRole('Super Admin')) {
                return $next($request);
            }

            // 4. Jika bukan Super Admin (atau belum login), tampilkan error 503
            abort(503, 'Sistem sedang dalam perbaikan rutin. Silakan kembali beberapa saat lagi.');
        }

        return $next($request);
    }
}