import AuthenticatedLayout from '@/layouts/authenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useRef } from 'react';
import { route } from 'ziggy-js';

interface User {
    id: string;
    name: string;
    email: string;
}

interface PageProps {
    auth: { user: User };
    [key: string]: any;
}

export default function Edit() {
    const { auth } = usePage<PageProps>().props;

    // Form Pembaruan Profil
    const profileForm = useForm({
        name: auth.user.name,
        email: auth.user.email,
    });

    // Form Pembaruan Password
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);
    const passwordForm = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updateProfile: FormEventHandler = (e) => {
        e.preventDefault();
        profileForm.patch(route('profile.update'));
    };

    const updatePassword: FormEventHandler = (e) => {
        e.preventDefault();
        passwordForm.put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => passwordForm.reset(),
            onError: (errors) => {
                if (errors.password) {
                    passwordForm.reset('password', 'password_confirmation');
                    passwordInput.current?.focus();
                }
                if (errors.current_password) {
                    passwordForm.reset('current_password');
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Pengaturan Profil</h2>}
        >
            <Head title="Profil" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    
                    {/* Bagian Edit Profil */}
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <section className="max-w-xl">
                            <header>
                                <h2 className="text-lg font-medium text-gray-900">Informasi Profil</h2>
                                <p className="mt-1 text-sm text-gray-600">Perbarui nama dan alamat email akun Anda.</p>
                            </header>

                            <form onSubmit={updateProfile} className="mt-6 space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
                                    <input
                                        type="text"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border px-3 py-2"
                                        value={profileForm.data.name}
                                        onChange={(e) => profileForm.setData('name', e.target.value)}
                                        required
                                    />
                                    {profileForm.errors.name && <p className="mt-2 text-sm text-red-600">{profileForm.errors.name}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border px-3 py-2"
                                        value={profileForm.data.email}
                                        onChange={(e) => profileForm.setData('email', e.target.value)}
                                        required
                                    />
                                    {profileForm.errors.email && <p className="mt-2 text-sm text-red-600">{profileForm.errors.email}</p>}
                                </div>

                                <div className="flex items-center gap-4">
                                    <button disabled={profileForm.processing} className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm">
                                        Simpan Profil
                                    </button>
                                    {profileForm.recentlySuccessful && <p className="text-sm text-green-600">Tersimpan.</p>}
                                </div>
                            </form>
                        </section>
                    </div>

                    {/* Bagian Ubah Password */}
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <section className="max-w-xl">
                            <header>
                                <h2 className="text-lg font-medium text-gray-900">Ubah Kata Sandi</h2>
                                <p className="mt-1 text-sm text-gray-600">Pastikan akun Anda menggunakan kata sandi yang panjang dan acak untuk tetap aman.</p>
                            </header>

                            <form onSubmit={updatePassword} className="mt-6 space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Kata Sandi Saat Ini</label>
                                    <input
                                        type="password"
                                        ref={currentPasswordInput}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border px-3 py-2"
                                        value={passwordForm.data.current_password}
                                        onChange={(e) => passwordForm.setData('current_password', e.target.value)}
                                    />
                                    {passwordForm.errors.current_password && <p className="mt-2 text-sm text-red-600">{passwordForm.errors.current_password}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Kata Sandi Baru</label>
                                    <input
                                        type="password"
                                        ref={passwordInput}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border px-3 py-2"
                                        value={passwordForm.data.password}
                                        onChange={(e) => passwordForm.setData('password', e.target.value)}
                                    />
                                    {passwordForm.errors.password && <p className="mt-2 text-sm text-red-600">{passwordForm.errors.password}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Konfirmasi Kata Sandi Baru</label>
                                    <input
                                        type="password"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border px-3 py-2"
                                        value={passwordForm.data.password_confirmation}
                                        onChange={(e) => passwordForm.setData('password_confirmation', e.target.value)}
                                    />
                                    {passwordForm.errors.password_confirmation && <p className="mt-2 text-sm text-red-600">{passwordForm.errors.password_confirmation}</p>}
                                </div>

                                <div className="flex items-center gap-4">
                                    <button disabled={passwordForm.processing} className="px-4 py-2 bg-gray-800 text-white rounded-md text-sm">
                                        Perbarui Kata Sandi
                                    </button>
                                    {passwordForm.recentlySuccessful && <p className="text-sm text-green-600">Kata sandi diperbarui.</p>}
                                </div>
                            </form>
                        </section>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}