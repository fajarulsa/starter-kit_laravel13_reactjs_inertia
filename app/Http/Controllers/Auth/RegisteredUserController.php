<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;

class RegisteredUserController extends Controller
{
    // Menampilkan halaman form register (Inertia React)
    public function create()
    {
        return Inertia::render('auth/register');
    }

    // Memproses data pendaftaran akun baru
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Berikan role default 'User' jika menggunakan Spatie Permission
        if (method_exists($user, 'assignRole')) {
            $user->assignRole('User');
        }

        Auth::login($user);

        return redirect(route('dashboard', absolute: false));
    }
}