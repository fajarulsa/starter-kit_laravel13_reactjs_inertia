import AuthenticatedLayout from '@/layouts/authenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';

interface User {
    id: string;
    name: string;
    email: string;
    roles?: { name: string }[];
}

interface PageProps {
    auth: {
        user: User;
    };
    [key: string]: any;
}

// Data statis untuk preview UI (Nantinya bisa diganti dengan data dari props server)
const recentUsers = [
    { id: 1, name: 'Ahmad Rizki', email: 'ahmad@kodepagihari.id', role: 'Admin', status: 'Aktif', date: '12 Mar 2025' },
    { id: 2, name: 'Siti Nurhaliza', email: 'siti@kodepagihari.id', role: 'Editor', status: 'Aktif', date: '10 Mar 2025' },
    { id: 3, name: 'Budi Santoso', email: 'budi@kodepagihari.id', role: 'User', status: 'Aktif', date: '8 Mar 2025' },
    { id: 4, name: 'Dewi Lestari', email: 'dewi@kodepagihari.id', role: 'User', status: 'Aktif', date: '5 Mar 2025' },
];

// SVG Icons
const SearchIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 text-slate-400">
        <circle cx="11" cy="11" r="5.5" /><path d="m16 16 5 5" />
    </svg>
);

const EditIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 text-blue-500">
        <path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
);

const TrashIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 text-red-500">
        <path d="M3 6h18" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
);

const FilterIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 text-slate-500">
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
);

export default function Dashboard() {
    const { auth } = usePage<PageProps>().props;
    
    // Mengambil role pertama pengguna, default ke 'Super Admin' jika belum ada relasi
    const userRole = auth.user.roles && auth.user.roles.length > 0 ? auth.user.roles[0].name : 'Super Admin';

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-8">
                    
                    {/* Welcome Banner */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-2xl border border-slate-200">
                        <div className="p-6 md:p-8 bg-gradient-to-br from-white to-slate-50/50">
                            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                Selamat datang, {auth.user.name}! <span className="text-2xl">👋</span>
                            </h3>
                            <p className="mt-1 text-sm text-slate-500">
                                Anda berhasil login ke dalam sistem boilerplate Kodepagihari.
                            </p>
                            
                            <div className="mt-6 pt-4">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                                    Role Anda:
                                </p>
                                <span className="inline-flex items-center px-4 py-1.5 rounded-lg text-xs font-semibold bg-[#edf5ff] text-[#2a75d0] border border-blue-100">
                                    Super Admin
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Data Pengguna Section */}
                    <div>
                        <h3 className="text-lg font-bold text-slate-800 mb-4">Data Pengguna</h3>
                        
                        <div className="bg-white shadow-sm sm:rounded-2xl border border-slate-200 overflow-hidden">
                            {/* Toolbar */}
                            <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4 bg-white">
                                
                                {/* Left Icons */}
                                <div className="flex items-center gap-3">
                                    <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition">
                                        <FilterIcon />
                                    </button>
                                </div>

                                {/* Center Search */}
                                <div className="flex-1 max-w-md w-full">
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <SearchIcon />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Cari pengguna..."
                                            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                                        />
                                    </div>
                                </div>

                                {/* Right Controls */}
                                <div className="flex items-center gap-3">
                                    <select className="border border-slate-200 rounded-xl text-sm py-2 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer bg-white">
                                        <option>10</option>
                                        <option>25</option>
                                        <option>50</option>
                                    </select>
                                    <Link 
                                        href={route('users.create')} 
                                        className="bg-[#2a75d0] hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition shadow-sm flex items-center gap-2"
                                    >
                                        <span>+</span> Tambah Pengguna
                                    </Link>
                                </div>
                            </div>

                            {/* Table */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-slate-100">
                                    <thead className="bg-slate-50/50">
                                        <tr>
                                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500">No</th>
                                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500">Nama</th>
                                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500">Email</th>
                                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500">Role</th>
                                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500">Status</th>
                                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500">Terdaftar</th>
                                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-slate-100">
                                        {recentUsers.map((user) => (
                                            <tr key={user.id} className="hover:bg-slate-50/50 transition group">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                                    {user.id}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-3">
                                                        <img 
                                                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`} 
                                                            alt={user.name} 
                                                            className="h-8 w-8 rounded-full shadow-sm"
                                                        />
                                                        <span className="text-sm font-medium text-slate-700">{user.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                                    {user.email}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-medium bg-[#edf5ff] text-[#2a75d0]">
                                                        {user.role}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-medium bg-emerald-50 text-emerald-600 border border-emerald-100">
                                                        {user.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                                    {user.date}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <div className="flex items-center gap-3 opacity-80 group-hover:opacity-100 transition">
                                                        <button className="p-1 hover:bg-blue-50 rounded transition" title="Edit">
                                                            <EditIcon />
                                                        </button>
                                                        <button className="p-1 hover:bg-red-50 rounded transition" title="Hapus">
                                                            <TrashIcon />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}