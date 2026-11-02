<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
                'regex:/^[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+$/', // Memastikan format modul.aksi (contoh: reports.create)
                'unique:permissions,name',
            ],
        ], [
            'name.regex' => 'Format permission harus menggunakan titik, contoh: modul.aksi (misal: reports.export)',
            'name.unique' => 'Permission ini sudah ada di dalam sistem.',
        ]);

        Permission::create([
            'name' => strtolower($request->name),
            'guard_name' => 'web',
        ]);

        return redirect()->back()->with('success', 'Permission baru berhasil ditambahkan.');
    }

    public function destroy(Permission $permission)
    {
        // Proteksi permission bawaan sistem agar tidak terhapus
        $protectedPermissions = [
            'dashboard.view',
            'users.view', 'users.create', 'users.edit', 'users.delete',
            'roles.view', 'roles.create', 'roles.edit', 'roles.delete'
        ];

        if (in_array($permission->name, $protectedPermissions)) {
            return redirect()->back()->with('error', 'Permission bawaan sistem tidak dapat dihapus.');
        }

        $permission->delete();

        return redirect()->back()->with('success', 'Permission berhasil dihapus.');
    }
}