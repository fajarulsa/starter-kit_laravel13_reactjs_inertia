<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;

class RoleAndPermissionSeeder extends Seeder
{
    public function run(): void
    {
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        Role::create(['name' => 'Super Admin']);
        Role::create(['name' => 'User']);

        $admin = User::create([
            'name' => 'Super Administrator',
            'email' => 'admin@kodepagihari.com',
            'password' => Hash::make('password123'),
        ]);

        $admin->assignRole('Super Admin');
    }
}