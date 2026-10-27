import { useState } from 'react';
import AuthenticatedLayout from '@/layouts/authenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { route } from 'ziggy-js';

interface Role {
    id: string | number;
    name: string;
}

interface User {
    id: string;
    name: string;
    email: string;
    roles: Role[];
    created_at: string;
}

interface PaginatedData {
    data: User[];
    current_page: number;
    last_page: number;
    total: number;
}

interface Props {
    users: PaginatedData;
}

export default function Index({ users }: Props) {
    // State untuk mengontrol Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState<string | null>(null);

    // Fungsi untuk membuka modal dan menyimpan ID user
    const confirmDelete = (id: string) => {
        setUserToDelete(id);
        setIsModalOpen(true);
    };

    // Fungsi untuk membatalkan dan menutup modal
    const closeModal = () => {
        setIsModalOpen(false);
        setUserToDelete(null);
    };

    // Fungsi untuk mengeksekusi penghapusan via Inertia
    const executeDelete = () => {
        if (userToDelete) {
            router.delete(route('users.destroy', userToDelete), {
                preserveScroll: true,
                onSuccess: () => closeModal(),
            });
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Manajemen Pengguna
                    </h2>
                    <Link href={route('users.create')} className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition">
                        + Tambah Pengguna
                    </Link>
                </div>
            }
        >
            <Head title="Manajemen Pengguna" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg relative z-0">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {users.data.map((user) => (
                                        <tr key={user.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {user.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {user.email}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <div className="flex gap-1">
                                                    {user.roles.map((role, idx) => (
                                                        <span key={idx} className="px-2 py-1 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-800">
                                                            {role.name}
                                                        </span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <Link href={route('users.edit', user.id)} className="text-indigo-600 hover:text-indigo-900 mr-3">
                                                    Edit
                                                </Link>
                                                <button onClick={() => confirmDelete(user.id)} className="text-red-600 hover:text-red-900">
                                                    Hapus
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 text-sm text-gray-500">
                            Menampilkan halaman {users.current_page} dari {users.last_page} (Total: {users.total} data)
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Konfirmasi Hapus */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-gray-900/50 p-4 sm:p-0">
                    <div className="relative w-full max-w-md transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8">
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                    <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                </div>
                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <h3 className="text-base font-semibold leading-6 text-gray-900">Hapus Pengguna</h3>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            Apakah Anda yakin ingin menghapus pengguna ini? Semua data yang terkait akan dihapus secara permanen. Aksi ini tidak dapat dibatalkan.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button
                                type="button"
                                onClick={executeDelete}
                                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto transition"
                            >
                                Ya, Hapus
                            </button>
                            <button
                                type="button"
                                onClick={closeModal}
                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto transition"
                            >
                                Batal
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}