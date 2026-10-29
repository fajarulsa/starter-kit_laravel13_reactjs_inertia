import { ReactNode, useEffect, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import toast, { Toaster } from 'react-hot-toast';
import { route } from 'ziggy-js';

interface User {
    id: string;
    name: string;
    email: string;
    roles?: string[];
    permissions?: string[];
}

interface PageProps {
    auth: {
        user: User;
    };
    flash: {
        success?: string;
        error?: string;
    };
    [key: string]: any;
}

interface AuthenticatedLayoutProps {
    header?: ReactNode;
    children: ReactNode;
}

function HomeIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
            <path d="M3 10.5 12 3l9 7.5" />
            <path d="M5 9.5V20h14V9.5" />
            <path d="M9 20v-6h6v6" />
        </svg>
    );
}

function UsersIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
            <path d="M16 19v-1a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v1" />
            <circle cx="10" cy="7" r="3" />
            <path d="M20 19v-1a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    );
}

function BriefcaseIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
            <rect x="3" y="7" width="18" height="12" rx="2" />
            <path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7" />
            <path d="M3 12h18" />
        </svg>
    );
}

function FileTextIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
            <path d="M7 3h7l5 5v13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
            <path d="M14 3v5h5" />
            <path d="M8 13h8M8 17h8" />
        </svg>
    );
}

function SettingsIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
            <circle cx="12" cy="12" r="3.2" />
            <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.86l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .96 1.7 1.7 0 0 0-.2 1.08v.17a2 2 0 0 1-4 0v-.17a1.7 1.7 0 0 0-.2-1.08 1.7 1.7 0 0 0-1-.96 1.7 1.7 0 0 0-1.86.34l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.96-1 1.7 1.7 0 0 0-1.08-.2H2.39a2 2 0 0 1 0-4h.17a1.7 1.7 0 0 0 1.08-.2 1.7 1.7 0 0 0 .96-1A1.7 1.7 0 0 0 4.6 7.1l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.96 1.7 1.7 0 0 0 .2-1.08V2.39a2 2 0 0 1 4 0v.17a1.7 1.7 0 0 0 .2 1.08 1.7 1.7 0 0 0 1 .96 1.7 1.7 0 0 0 1.86-.34l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.7 1.7 0 0 0 19.4 9c.26.35.67.58 1.15.64a1.7 1.7 0 0 0 1.28-.28 2 2 0 0 1 0 3.56 1.7 1.7 0 0 0-1.28-.28 1.7 1.7 0 0 0-1.15.64Z" />
        </svg>
    );
}

function SearchIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4 text-slate-400">
            <circle cx="11" cy="11" r="5.5" />
            <path d="m16 16 5 5" />
        </svg>
    );
}

function BellIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
            <path d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 1 0-12 0v3.2a2 2 0 0 1-.6 1.4L4 17h5" />
            <path d="M10 20a2 2 0 0 0 4 0" />
        </svg>
    );
}

export default function AuthenticatedLayout({ header, children }: AuthenticatedLayoutProps) {
    const { auth, flash } = usePage<PageProps>().props;
    
    // State untuk mengontrol buka-tutup pop-up profil
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success, { duration: 4000 });
        }
        if (flash?.error) {
            toast.error(flash.error, { duration: 5000 });
        }
    }, [flash]);

    const navItems = [
        { label: 'Dashboard', href: route('dashboard'), active: route().current('dashboard'), icon: <HomeIcon /> },
        { label: 'Pengguna', href: route('users.index'), active: route().current('users.*'), icon: <UsersIcon /> },
    ];

    return (
        <div className="min-h-screen bg-[#f3f5f7] text-slate-800">
            <Toaster position="top-right" reverseOrder={false} />

            <div className="flex min-h-screen">
                <aside className="flex w-[230px] shrink-0 flex-col border-r border-slate-200 bg-white">
                    <div className="flex h-[72px] items-center justify-center border-b border-slate-200 px-4">
                        <div className="flex items-center gap-2 text-[28px] font-black tracking-tight text-slate-900">
                            <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-slate-900 text-xs text-white">&lt;/&gt;</span>
                            <span className="text-2xl font-bold">Kodepagihari</span>
                        </div>
                    </div>

                    <nav className="mt-2 flex-1 space-y-1 px-3">
                        {navItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={[
                                    'flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition',
                                    item.active
                                        ? 'bg-[#edf5ff] text-[#2a75d0] shadow-sm'
                                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
                                ].join(' ')}
                            >
                                <span
                                    className={[
                                        'inline-flex h-7 w-7 items-center justify-center rounded-lg',
                                        item.active ? 'bg-[#dfeeff] text-[#2a75d0]' : 'bg-slate-100 text-slate-500',
                                    ].join(' ')}
                                >
                                    {item.icon}
                                </span>
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="border-t border-slate-200 p-4">
                        <div className="flex items-center gap-3">
                            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
                                &lt;/&gt;
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-slate-800">Kodepagihari</p>
                                <p className="text-xs text-slate-500">Admin Panel v1.0.0</p>
                            </div>
                        </div>
                    </div>
                </aside>

                <div className="flex flex-1 flex-col">
                    <header className="h-[72px] border-b border-slate-200 bg-white/80 backdrop-blur">
                        <div className="flex h-full items-center justify-between gap-4 px-6">
                            <div className="flex flex-1 items-center gap-3">
                                <label className="flex w-full max-w-[560px] items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5">
                                    <SearchIcon />
                                    <input
                                        type="text"
                                        value=""
                                        readOnly
                                        placeholder="Cari fitur, pengguna, atau sesuatu..."
                                        className="w-full border-0 bg-transparent text-sm text-slate-600 placeholder:text-slate-400 focus:outline-none"
                                    />
                                </label>
                                <span className="hidden rounded-lg border border-slate-200 bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-500 md:inline-flex">
                                    Ctrl + K
                                </span>
                            </div>

                            <div className="flex items-center gap-4">
                                <button
                                    type="button"
                                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50"
                                    aria-label="Notifications"
                                >
                                    <BellIcon />
                                </button>

                                {/* Area Profil dengan Dropdown */}
                                <div className="relative">
                                    <button
                                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                                        className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-2 py-1.5 shadow-sm transition hover:bg-slate-50 focus:outline-none"
                                    >
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-slate-700 to-slate-400 text-sm font-bold text-white">
                                            {auth.user.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="pr-1 text-right">
                                            <p className="text-sm font-semibold text-slate-800">{auth.user.name}</p>
                                            <p className="text-[11px] text-slate-500">Admin</p>
                                        </div>
                                    </button>

                                    {/* Menu Pop-up / Dropdown */}
                                    {isProfileOpen && (
                                        <div className="absolute right-0 top-full mt-2 w-48 origin-top-right rounded-xl border border-slate-200 bg-white py-2 shadow-lg focus:outline-none z-50">
                                            <Link
                                                href={route('profile.edit')}
                                                className="block px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                                                onClick={() => setIsProfileOpen(false)}
                                            >
                                                Edit Profile
                                            </Link>
                                            <div className="my-1 border-t border-slate-100"></div>
                                            <Link
                                                href={route('logout')}
                                                method="post"
                                                as="button"
                                                className="block w-full text-left px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                                            >
                                                Log Out
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </header>

                    <main className="flex-1 p-6">
                        {header && <div className="mb-6">{header}</div>}
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}