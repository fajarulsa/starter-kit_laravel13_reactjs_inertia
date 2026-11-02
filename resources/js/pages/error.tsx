import { Head, Link } from '@inertiajs/react';
import { route } from 'ziggy-js';

interface Props {
    status: number;
    message?: string;
}

export default function ErrorPage({ status, message }: Props) {
    const title = status === 403 ? 'Akses Dibatasi!' : 'Terjadi Kesalahan';
    const description =
        message ||
        'Maaf, akun Anda tidak memiliki izin (permission) yang cukup untuk mengakses halaman ini.';

    return (
        <div className="min-h-screen bg-[#f3f5f7] flex items-center justify-center p-4 text-slate-800">
            <Head title={`${status} - Akses Ditolak`} />

            <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 p-8 shadow-sm text-center space-y-6">
                <div className="mx-auto w-16 h-16 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-500 shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>

                <div className="space-y-2">
                    <span className="inline-block px-3 py-1 bg-red-50 text-red-600 text-xs font-bold rounded-full uppercase tracking-wider border border-red-100">
                        Error {status} • Akses Ditolak
                    </span>
                    <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
                    <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/60 text-left flex items-start gap-3">
                    <div className="text-amber-600 mt-0.5 shrink-0">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <p className="text-xs text-amber-800 leading-relaxed">
                        Jika Anda membutuhkan akses ke fitur ini, silakan hubungi <strong>Super Admin</strong> untuk memperbarui hak akses akun Anda.
                    </p>
                </div>

                <div className="pt-2">
                    <Link
                        href={route('dashboard')}
                        className="inline-flex items-center justify-center w-full bg-[#2a75d0] hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-xl transition text-sm shadow-sm"
                    >
                        Kembali ke Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
}