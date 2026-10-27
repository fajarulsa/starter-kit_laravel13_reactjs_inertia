import AuthenticatedLayout from '@/layouts/authenticatedLayout';
import { Head, usePage } from '@inertiajs/react';

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
    [key: string]: any;
}

export default function Dashboard() {
    const { auth } = usePage<PageProps>().props;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-lg font-medium mb-2">Selamat datang, {auth.user.name}! 👋</h3>
                            <p className="text-sm text-gray-600 mb-4">Anda berhasil login ke dalam sistem boilerplate Kodepagihari.</p>
                            
                            <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Role Anda:</p>
                                <div className="mt-1 flex gap-2">
                                    {auth.user.roles && auth.user.roles.length > 0 ? (
                                        auth.user.roles.map((role, index) => (
                                            <span key={index} className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                                                {role}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="text-sm text-gray-500">Tidak ada role</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}