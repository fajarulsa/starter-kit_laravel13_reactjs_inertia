import { FormEventHandler } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/authenticatedLayout';
import { route } from 'ziggy-js';

interface Props {
    settings: {
        app_name: string;
        app_email: string;
        maintenance_mode: string;
    };
}

export default function SettingsIndex({ settings }: Props) {
    const form = useForm({
        app_name: settings.app_name,
        app_email: settings.app_email,
        maintenance_mode: settings.maintenance_mode,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        form.post(route('settings.update'));
    };

    // Form untuk notifikasi
    const announcementForm = useForm({
        title: '',
        message: '',
    });

    const submitAnnouncement: FormEventHandler = (e) => {
        e.preventDefault();
        announcementForm.post(route('notifications.announcement'), {
            onSuccess: () => announcementForm.reset(),
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Pengaturan Sistem" />

            <div className="py-8 max-w-4xl mx-auto sm:px-6 lg:px-8 space-y-6">
                <div>
                    <h2 className="text-xl font-bold text-slate-800">Pengaturan Global Sistem</h2>
                    <p className="text-sm text-slate-500">
                        Atur konfigurasi dasar aplikasi, alamat email, dan status mode pemeliharaan.
                    </p>
                </div>

                <form onSubmit={submit} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700">Nama Aplikasi</label>
                        <input
                            type="text"
                            required
                            value={form.data.app_name}
                            onChange={(e) => form.setData('app_name', e.target.value)}
                            className="mt-1.5 block w-full rounded-xl border-slate-200 text-sm px-3.5 py-2.5 border focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#2a75d0] transition"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700">Email Dukungan System</label>
                        <input
                            type="email"
                            required
                            value={form.data.app_email}
                            onChange={(e) => form.setData('app_email', e.target.value)}
                            className="mt-1.5 block w-full rounded-xl border-slate-200 text-sm px-3.5 py-2.5 border focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#2a75d0] transition"
                        />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-slate-50/80 rounded-2xl border border-slate-200/80">
                        <div>
                            <p className="text-sm font-bold text-slate-800">Mode Pemeliharaan (Maintenance Mode)</p>
                            <p className="text-xs text-slate-500 mt-0.5">
                                Aktifkan untuk membatasi akses pengguna umum saat sistem sedang dalam perbaikan.
                            </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={form.data.maintenance_mode === '1'}
                                onChange={(e) => form.setData('maintenance_mode', e.target.checked ? '1' : '0')}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2a75d0]"></div>
                        </label>
                    </div>

                    <div className="flex justify-end pt-2">
                        <button
                            type="submit"
                            disabled={form.processing}
                            className="bg-[#2a75d0] hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition shadow-sm"
                        >
                            Simpan Pengaturan
                        </button>
                    </div>
                </form>
                <form onSubmit={submitAnnouncement} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4 mt-6">
                    <div>
                        <h3 className="font-bold text-slate-800 text-base">Siarkan Pengumuman (Broadcast)</h3>
                        <p className="text-xs text-slate-500">Kirim notifikasi in-app ke seluruh akun pengguna di sistem.</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Judul</label>
                        <input type="text" required value={announcementForm.data.title} onChange={e => announcementForm.setData('title', e.target.value)} className="mt-1 block w-full rounded-xl border-slate-200 text-sm px-3.5 py-2 border focus:ring-2 focus:ring-blue-500/20" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Pesan</label>
                        <textarea required rows={3} value={announcementForm.data.message} onChange={e => announcementForm.setData('message', e.target.value)} className="mt-1 block w-full rounded-xl border-slate-200 text-sm px-3.5 py-2 border focus:ring-2 focus:ring-blue-500/20" />
                    </div>
                    <div className="flex justify-end">
                        <button type="submit" disabled={announcementForm.processing} className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition shadow-sm">
                            Kirim Notifikasi
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}