import { FormEventHandler, useState } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import GuestLayout from '@/layouts/guestLayout';
import { route } from 'ziggy-js';

export default function Login({ status, canResetPassword }: { status?: string; canResetPassword?: boolean }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Sign In" />

            {/* Background Lembut dengan Efek Gradasi */}
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-slate-100 flex items-center justify-center p-4">
                
                {/* Kartu Container Utama */}
                <div className="max-w-md w-full bg-white rounded-3xl border border-slate-100 p-8 sm:p-10 shadow-xl shadow-slate-200/50 space-y-8 relative">
                    
                    {/* Header Logo & Judul */}
                    <div className="text-center space-y-3">
                        <div className="mx-auto w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                            {/* Logo Ikon Sederhana */}
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Welcome Back</h1>
                            <p className="text-xs text-slate-500 mt-1">Sign in to your account to continue</p>
                        </div>
                    </div>

                    {status && (
                        <div className="mb-4 text-xs font-medium text-emerald-600 bg-emerald-50 p-3 rounded-xl border border-emerald-100 text-center">
                            {status}
                        </div>
                    )}

                    {/* Form Input */}
                    <form onSubmit={submit} className="space-y-5">
                        
                        {/* Input Email */}
                        <div className="space-y-1">
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                    {/* Ikon Amplop Email */}
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </span>
                                <input
                                    type="email"
                                    required
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="Email address"
                                    className="block w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-2xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                                />
                            </div>
                            {errors.email && <p className="text-xs text-red-500 pl-1">{errors.email}</p>}
                        </div>

                        {/* Input Password */}
                        <div className="space-y-1">
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                    {/* Ikon Gembok Password */}
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </span>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="Password"
                                    className="block w-full pl-11 pr-11 py-3 bg-slate-50/50 border border-slate-200 rounded-2xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                                >
                                    {/* Ikon Mata Sembunyikan/Tampilkan */}
                                    {showPassword ? (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            {errors.password && <p className="text-xs text-red-500 pl-1">{errors.password}</p>}
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between text-xs pt-1">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500/20 h-4 w-4"
                                />
                                <span className="text-slate-600 font-medium">Remember me</span>
                            </label>

                            {canResetPassword && (
                                <Link href={route('password.request')} className="text-blue-600 font-semibold hover:underline">
                                    Forgot password?
                                </Link>
                            )}
                        </div>

                        {/* Tombol Sign In */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-medium py-3 rounded-2xl transition shadow-lg shadow-blue-600/25 text-sm disabled:opacity-50"
                        >
                            Sign In
                        </button>
                    </form>

                    {/* Garis Pemisah "or continue with" */}
                    <div className="relative flex py-1 items-center">
                        <div className="flex-grow border-t border-slate-100"></div>
                        <span className="flex-shrink mx-4 text-slate-400 text-[11px] uppercase tracking-wider">or continue with</span>
                        <div className="flex-grow border-t border-slate-100"></div>
                    </div>

                    {/* Tombol Social Login (Google) */}
                    <a
                        href={route('auth.google')}
                        className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-medium py-3 rounded-2xl transition text-sm shadow-sm"
                    >
                        <svg className="w-4 h-4" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.13 0-5.78-2.11-6.73-4.96H1.2v3.15C3.21 21.34 7.27 24 12 24z"/>
                            <path fill="#FBBC05" d="M5.27 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.61H1.2C.44 8.16 0 9.92 0 11.8s.44 3.64 1.2 5.19l4.07-3.15z"/>
                            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.27 0 3.21 2.66 1.2 6.61l4.07 3.15c.95-2.85 3.6-4.96 6.73-4.96z"/>
                        </svg>
                        Continue with Google
                    </a>

                    {/* Footer Pendaftaran */}
                    {/* <div className="text-center text-xs text-slate-500 pt-2">
                        Don't have an account?{' '}
                        <Link href={route('register')} className="text-blue-600 font-semibold hover:underline">
                            Sign up
                        </Link>
                    </div> */}

                </div>
            </div>
        </GuestLayout>
    );
}