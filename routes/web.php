<?php

// use Illuminate\Support\Facades\Route;
// use Inertia\Inertia;

// Route::get('/', function () {
//     return inertia('auth/login');
// });

// // Tambahkan ->name('login') di sini
// Route::get('/login', function () {
//     return Inertia::render('auth/login');
// })->name('login');

// // Endpoint POST untuk aksi login (sesuaikan dengan controller autentikasi kamu)
// // Route::post('/login', [LoginController::class, 'store'])->name('login.store');

// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::get('/dashboard', function () {
//         return Inertia::render('dashboard');
//     })->name('dashboard');
// });

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\SystemHealthController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\Auth\GoogleController;
use App\Http\Controllers\Auth\RegisteredUserController;

Route::get('/', function () {
    return inertia('auth/login');
});

Route::get('/login', function () {
    return Inertia::render('auth/login');
})->name('login');

// Ubah penanganan POST login agar merespons dengan benar untuk Inertia
Route::post('/login', function (Request $request) {
    $credentials = $request->validate([
        'email' => ['required', 'email'],
        'password' => ['required'],
    ]);

    if (Auth::attempt($credentials, $request->boolean('remember'))) {
        $request->session()->regenerate();

        // Menggunakan redirect biasa yang aman untuk Inertia
        return redirect()->intended('/dashboard');
    }

    return back()->withErrors([
        'email' => 'Email atau password yang Anda masukkan salah.',
    ]);
});

//  Google OAuth Routes
Route::get('/auth/google', [GoogleController::class, 'redirectToGoogle'])->name('auth.google');
Route::get('/auth/google/callback', [GoogleController::class, 'handleGoogleCallback']);

Route::post('/logout', function (Request $request) {
    Auth::logout();
    $request->session()->invalidate();
    $request->session()->regenerateToken();

    return redirect('/login');
})->name('logout');

// Rute Registrasi
Route::get('/register', [RegisteredUserController::class, 'create'])
    ->middleware('guest')
    ->name('register');

Route::post('/register', [RegisteredUserController::class, 'store'])
    ->middleware('guest');

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard')->middleware('can:dashboard.view');

    // Rute Role & Permission
    Route::resource('roles', RoleController::class)->except(['create', 'show', 'edit'])->middleware('can:roles.view');

    // Rute CRUD Permission Khusus
    Route::post('/permissions', [PermissionController::class, 'store'])->name('permissions.store')->middleware('can:roles.create');
    Route::delete('/permissions/{permission}', [PermissionController::class, 'destroy'])->name('permissions.destroy')->middleware('can:roles.delete');

    // Rute Manajemen Profil & Keamanan
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::put('/password', [ProfileController::class, 'updatePassword'])->name('password.update');

    // Rute Manajemen Pengguna
    Route::get('/users', [UserController::class, 'index'])->name('users.index');
    Route::get('/users/create', [UserController::class, 'create'])->name('users.create');
    Route::post('/users', [UserController::class, 'store'])->name('users.store');
    Route::get('/users/{user}/edit', [UserController::class, 'edit'])->name('users.edit');
    Route::put('/users/{user}', [UserController::class, 'update'])->name('users.update');
    Route::delete('/users/{user}', [UserController::class, 'destroy'])->name('users.destroy');

    // Rute System Health Dashboard
    Route::get('/health', [SystemHealthController::class, 'index'])->name('health.index');//->middleware('can:health.view');

    // Rute Pengaturan Sistem
    Route::get('/settings', [SettingController::class, 'index'])->name('settings.index')->middleware('can:settings.view');
    Route::post('/settings', [SettingController::class, 'update'])->name('settings.update')->middleware('can:settings.edit');

    // In-App Notifications
    Route::post('/notifications/mark-all-read', [NotificationController::class, 'markAllAsRead'])->name('notifications.mark-all-read');
    Route::post('/notifications/{id}/mark-read', [NotificationController::class, 'markAsRead'])->name('notifications.mark-read');
    Route::post('/notifications/announcement', [NotificationController::class, 'sendAnnouncement'])->name('notifications.announcement')->middleware('can:settings.edit');
});