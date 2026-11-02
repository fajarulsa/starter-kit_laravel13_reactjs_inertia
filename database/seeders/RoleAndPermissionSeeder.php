<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class RoleAndPermissionSeeder extends Seeder
{
    public function run(): void
    {
        // Bersihkan cache Spatie Permission
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        // 1. Daftar Hak Akses Dasar Sistem (Format: modul.tindakan)
        $permissions = [
            // Dashboard
            'dashboard.view',

            // Manajemen Pengguna
            'users.view',
            'users.create',
            'users.edit',
            'users.delete',

            // System Health & Monitoring
            'health.view',

            // Manajemen Peran & Hak Akses
            'roles.view',
            'roles.create',
            'roles.edit',
            'roles.delete',

            // Pengaturan Sistem
            'settings.view',
            'settings.edit',
        ];

        // 2. Masukkan semua permission ke basis data
        foreach ($permissions as $permission) {
            Permission::findOrCreate($permission, 'web');
        }

        // 3. Buat SATU-SATUNYA Peran Bawaan: Super Admin
        $superAdmin = Role::findOrCreate('Super Admin', 'web');

        // 4. Berikan SEMUA Hak Akses ke Super Admin
        $superAdmin->syncPermissions(Permission::all());
    }
}