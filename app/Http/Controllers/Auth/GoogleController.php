<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Str;

class GoogleController extends Controller
{
    // Mengalihkan pengguna ke halaman login Google
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    // Menangani kembalian data dari Google
    public function handleGoogleCallback()
    {
        try {
            $googleUser = Socialite::driver('google')->user();
            
            // Cek apakah user sudah terdaftar berdasarkan email
            $user = User::where('email', $googleUser->getEmail())->first();

            if ($user) {
                // Jika user sudah ada, perbarui google_id jika kosong
                if (!$user->google_id) {
                    $user->update(['google_id' => $googleUser->getId()]);
                }
            } else {
                // Jika belum ada, buat akun baru secara otomatis
                $user = User::create([
                    'name' => $googleUser->getName(),
                    'email' => $googleUser->getEmail(),
                    'google_id' => $googleUser->getId(),
                    'password' => Hash::make(Str::random(24)), // Password acak aman
                    'email_verified_at' => now(), // Verifikasi otomatis dari Google
                ]);

                // Berikan role default (misal: User) jika menggunakan Spatie Permission
                if (method_exists($user, 'assignRole')) {
                    $user->assignRole('User');
                }
            }

            // Lakukan proses login
            Auth::login($user);

            return redirect()->intended('/dashboard');

        } catch (\Exception $e) {
            return redirect()->route('login')->with('error', 'Gagal masuk menggunakan Google. Silakan coba lagi.');
        }
    }
}