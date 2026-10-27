import { ReactNode, useEffect } from 'react';
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

export default function AuthenticatedLayout({ header, children }: AuthenticatedLayoutProps) {
    const { auth, flash } = usePage<PageProps>().props;
    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success, { duration: 4000 });
        }
        if (flash?.error) {
            toast.error(flash.error, { duration: 5000 });
        }
    }, [flash]);

    return (
        <div className="min-h-screen bg-gray-100">
            <Toaster position="top-right" reverseOrder={false} />
            <nav className="border-b border-gray-200 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Link href="/dashboard" className="font-bold text-xl text-gray-800">
                                    Kodepagihari
                                </Link>
                            </div>
                            <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                <Link href={route('dashboard')} className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300">
                                    Dashboard
                                </Link>
                                <Link href={route('users.index')} className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300">
                                    Users
                                </Link>
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ml-6">
                            <div className="relative ml-3">
                                <div className="flex items-center gap-3">
                                    <Link 
                                        href={route('profile.edit')} 
                                        className="rounded-md bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-100">
                                        {auth.user.name}
                                    </Link>
                                    <Link
                                        href={route('logout')}
                                        method="post"
                                        as="button"
                                        className="rounded-md bg-red-50 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-100"
                                    >
                                        Log Out
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}