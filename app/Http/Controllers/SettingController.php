<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class SettingController extends Controller
{
    public function index()
    {
        Gate::authorize('settings.view');

        return Inertia::render('settings/index', [
            'settings' => [
                'app_name' => Setting::get('app_name', 'Kodepagihari Admin'),
                'app_email' => Setting::get('app_email', 'admin@kodepagihari.com'),
                'maintenance_mode' => Setting::get('maintenance_mode', '0'),
            ],
        ]);
    }

    public function update(Request $request)
    {
        Gate::authorize('settings.edit');

        $request->validate([
            'app_name' => 'required|string|max:255',
            'app_email' => 'required|email|max:255',
            'maintenance_mode' => 'nullable|in:0,1',
        ]);

        Setting::set('app_name', $request->app_name);
        Setting::set('app_email', $request->app_email);
        Setting::set('maintenance_mode', $request->has('maintenance_mode') && $request->maintenance_mode == '1' ? '1' : '0');

        return redirect()->back()->with('success', 'Pengaturan sistem berhasil disimpan.');
    }
}