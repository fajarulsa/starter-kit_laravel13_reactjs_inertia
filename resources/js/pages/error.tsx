import { Head, Link } from '@inertiajs/react';
import { route } from 'ziggy-js';

interface Props {
    status: number;
    message?: string;
}

export default function ErrorPage({ status, message }: Props) {
    
    // ---------------------------------------------------------
    // 1. Tampilan Khusus Mode Pemeliharaan (Error 503)
    // ---------------------------------------------------------
    if (status === 503) {
        return (
            <div className="min-h-screen bg-[#f3f5f7] flex items-center justify-center p-4 text-slate-800">
                <Head title="Sistem Sedang Diperbarui" />
                <div className="max-w-lg w-full bg-white rounded-3xl border border-slate-200 p-10 shadow-sm text-center space-y-6 relative overflow-hidden">
                    
                    {/* Aksen Dekorasi Background */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-50 rounded-full blur-3xl opacity-60"></div>
                    <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-slate-100 rounded-full blur-3xl opacity-60"></div>

                    {/* Ikon Animasi Berputar */}
                    <div className="relative mx-auto w-24 h-24 bg-blue-50/50 text-[#2a75d0] rounded-full flex items-center justify-center mb-4 border border-blue-100/50 shadow-inner">
                        <svg className="w-12 h-12 animate-[spin_4s_linear_infinite]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                    </div>

                    <div className="space-y-3 relative z-10">
                        <span className="inline-block px-3 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold rounded-full uppercase tracking-widest border border-slate-200">
                            Maintenance Mode
                        </span>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Sistem Sedang Diperbarui</h1>
                        <p className="text-sm text-slate-500 leading-relaxed px-4">
                            {message || 'Kami sedang melakukan peningkatan infrastruktur untuk pengalaman yang lebih baik. Mohon maaf atas ketidaknyamanan ini dan silakan kembali dalam beberapa saat.'}
                        </p>
                    </div>

                    <div className="pt-6 relative z-10">
                        <Link
                            href={route('login')}
                            className="inline-flex items-center justify-center w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold px-5 py-3.5 rounded-xl transition text-sm shadow-md"
                        >
                            Kembali ke Halaman Login    
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // ---------------------------------------------------------
    // 2. Tampilan Default untuk Error Lainnya (403, 404, 500)
    // ---------------------------------------------------------
    const title = status === 403 ? 'Akses Dibatasi!' : status === 404 ? 'Halaman Tidak Ditemukan' : 'Terjadi Kesalahan';
    const description = message || 'Maaf, akun Anda tidak memiliki izin (permission) yang cukup untuk mengakses halaman ini.';

    return (
        <div className="min-h-screen bg-[#f3f5f7] flex items-center justify-center p-4 text-slate-800">
            <Head title={`${status} - ${title}`} />

            <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 p-8 shadow-sm text-center space-y-6">
                
                {/* Ikon Error */}
                <div className="mx-auto w-16 h-16 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-500 shadow-sm">
                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>

                <div className="space-y-2">
                    <span className="inline-block px-3 py-1 bg-red-50 text-red-600 text-xs font-bold rounded-full uppercase tracking-wider border border-red-100">
                        Error {status} • {status === 404 ? 'Tidak Ditemukan' : 'Akses Ditolak'}
                    </span>
                    <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
                    <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
                </div>

                {/* Box Peringatan Khusus 403 */}
                {status === 403 && (
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
                )}

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