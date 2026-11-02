import { FormEventHandler } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import GuestLayout from '@/layouts/guestLayout';
import { route } from 'ziggy-js';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Sign Up" />

            {/* Background Wallpaper SVG */}
            <div 
                className="min-h-screen w-full flex items-center justify-center p-4 bg-cover bg-center bg-no-repeat relative"
                // style={{ backgroundImage: `url('/images/login-bg.svg')` }}
            >
                <div className="absolute inset-0 bg-slate-900/10 backdrop-blur-[2px]"></div>

                {/* Kartu Container Form Register */}
                <div className="max-w-md w-full bg-white/95 backdrop-blur-md rounded-3xl border border-white/20 p-8 sm:p-10 shadow-2xl shadow-slate-900/10 space-y-6 relative z-10">
                    
                    <div className="text-center space-y-2">
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Create Account</h1>
                        <p className="text-xs text-slate-500">Sign up to get started with your account</p>
                    </div>

                    <form onSubmit={submit} className="space-y-4">
                        {/* Nama */}
                        <div>
                            <input
                                type="text"
                                required
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                placeholder="Full name"
                                className="block w-full px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-2xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                            />
                            {errors.name && <p className="text-xs text-red-500 pl-1 mt-1">{errors.name}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <input
                                type="email"
                                required
                                value={data.email}
                                onChange={e => setData('email', e.target.value)}
                                placeholder="Email address"
                                className="block w-full px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-2xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                            />
                            {errors.email && <p className="text-xs text-red-500 pl-1 mt-1">{errors.email}</p>}
                        </div>

                        {/* Password */}
                        <div>
                            <input
                                type="password"
                                required
                                value={data.password}
                                onChange={e => setData('password', e.target.value)}
                                placeholder="Password"
                                className="block w-full px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-2xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                            />
                            {errors.password && <p className="text-xs text-red-500 pl-1 mt-1">{errors.password}</p>}
                        </div>

                        {/* Konfirmasi Password */}
                        <div>
                            <input
                                type="password"
                                required
                                value={data.password_confirmation}
                                onChange={e => setData('password_confirmation', e.target.value)}
                                placeholder="Confirm password"
                                className="block w-full px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-2xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-medium py-3 rounded-2xl transition shadow-lg shadow-blue-600/25 text-sm disabled:opacity-50 mt-2"
                        >
                            Sign Up
                        </button>
                    </form>

                    <div className="text-center text-xs text-slate-500 pt-2">
                        Already have an account?{' '}
                        <Link href={route('login')} className="text-blue-600 font-semibold hover:underline">
                            Sign in
                        </Link>
                    </div>

                </div>
            </div>
        </GuestLayout>
    );
}