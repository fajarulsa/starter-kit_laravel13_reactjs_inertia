<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Jalankan Seeder Hak Akses Dasar & Role Super Admin
        $this->call(RoleAndPermissionSeeder::class);

        // Buat atau Ambil Akun Utama Super Admin
        $admin = User::firstOrCreate(
            ['email' => 'admin@kodepagihari.com'],
            [
                'name' => 'Super Administrator1',
                'password' => bcrypt('password123'),
            ]
        );

        // Pasangkan Peran Super Admin ke Akun Utama
        $admin->assignRole('Super Admin');
    }
}