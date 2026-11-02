<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Notifications\SystemAnnouncement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Notification;

class NotificationController extends Controller
{
    public function markAsRead(string $id)
    {
        $notification = auth()->user()->notifications()->where('id', $id)->first();
        if ($notification) {
            $notification->markAsRead();
        }

        return redirect()->back();
    }

    public function markAllAsRead()
    {
        auth()->user()->unreadNotifications->markAsRead();

        return redirect()->back();
    }

    public function sendAnnouncement(Request $request)
    {
        // Hanya yang punya akses pengaturan yang bisa kirim broadcast
        Gate::authorize('settings.edit');

        $request->validate([
            'title' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        $users = User::all();
        Notification::send($users, new SystemAnnouncement($request->title, $request->message));

        return redirect()->back()->with('success', 'Pengumuman berhasil disiarkan ke seluruh pengguna.');
    }
}