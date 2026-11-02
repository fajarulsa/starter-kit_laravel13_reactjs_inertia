import { useState, FormEventHandler } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/authenticatedLayout';
import { route } from 'ziggy-js';

interface PermissionItem {
    id: number | string;
    name: string;
}

interface GroupedPermissions {
    [groupKey: string]: PermissionItem[];
}

interface RoleItem {
    id: string;
    name: string;
    permissions: PermissionItem[];
}

interface Props {
    roles: RoleItem[];
    permissions: GroupedPermissions;
}

export default function RolesIndex({ roles, permissions }: Props) {
    const [selectedRole, setSelectedRole] = useState<RoleItem | null>(roles[0] || null);
    const [isCreateRoleModalOpen, setIsCreateRoleModalOpen] = useState(false);
    const [isCreatePermissionModalOpen, setIsCreatePermissionModalOpen] = useState(false);

    // Form Tambah Role
    const createRoleForm = useForm({
        name: '',
        permissions: [] as string[],
    });

    // Form Tambah Permission Baru
    const createPermissionForm = useForm({
        name: '',
    });

    // Form Matriks Update Role
    const matrixForm = useForm({
        name: selectedRole?.name || '',
        permissions: selectedRole ? selectedRole.permissions.map((p) => p.name) : [] as string[],
    });

    const openEditMatrix = (role: RoleItem) => {
        setSelectedRole(role);
        matrixForm.setData({
            name: role.name,
            permissions: role.permissions.map((p) => p.name),
        });
    };

    const handlePermissionToggle = (permName: string) => {
        const current = [...matrixForm.data.permissions];
        if (current.includes(permName)) {
            matrixForm.setData('permissions', current.filter((p) => p !== permName));
        } else {
            matrixForm.setData('permissions', [...current, permName]);
        }
    };

    const handleSelectAllInGroup = (groupPerms: PermissionItem[]) => {
        const groupNames = groupPerms.map((p) => p.name);
        const allSelected = groupNames.every((p) => matrixForm.data.permissions.includes(p));

        if (allSelected) {
            matrixForm.setData('permissions', matrixForm.data.permissions.filter((p) => !groupNames.includes(p)));
        } else {
            const combined = Array.from(new Set([...matrixForm.data.permissions, ...groupNames]));
            matrixForm.setData('permissions', combined);
        }
    };

    const submitCreateRole: FormEventHandler = (e) => {
        e.preventDefault();
        createRoleForm.post(route('roles.store'), {
            onSuccess: () => {
                setIsCreateRoleModalOpen(false);
                createRoleForm.reset();
            },
        });
    };

    const submitCreatePermission: FormEventHandler = (e) => {
        e.preventDefault();
        createPermissionForm.post(route('permissions.store'), {
            onSuccess: () => {
                setIsCreatePermissionModalOpen(false);
                createPermissionForm.reset();
            },
        });
    };

    const submitUpdateMatrix: FormEventHandler = (e) => {
        e.preventDefault();
        if (!selectedRole) return;
        matrixForm.put(route('roles.update', selectedRole.id), {
            onSuccess: () => {},
        });
    };

    const handleDeleteRole = (role: RoleItem) => {
        if (confirm(`Apakah Anda yakin ingin menghapus peran "${role.name}"?`)) {
            router.delete(route('roles.destroy', role.id));
        }
    };

    const handleDeletePermission = (perm: PermissionItem) => {
        if (confirm(`Hapus permission "${perm.name}" secara permanen dari sistem?`)) {
            router.delete(route('permissions.destroy', perm.id));
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Manajemen Peran & Hak Akses" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h2 className="text-xl font-bold text-slate-800">Peran & Hak Akses (RBAC)</h2>
                            <p className="text-sm text-slate-500">Kelola hierarki pengguna, buat permission baru, dan atur matriks izin secara dinamis.</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setIsCreatePermissionModalOpen(true)}
                                className="border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-xl text-sm font-medium transition shadow-sm"
                            >
                                + Permission Baru
                            </button>
                            <button
                                onClick={() => setIsCreateRoleModalOpen(true)}
                                className="bg-[#2a75d0] hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition shadow-sm"
                            >
                                + Tambah Peran
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        
                        {/* List Role (Kiri) */}
                        <div className="lg:col-span-1 space-y-3">
                            {roles.map((role) => {
                                const isSelected = selectedRole?.id === role.id;
                                return (
                                    <div
                                        key={role.id}
                                        onClick={() => openEditMatrix(role)}
                                        className={[
                                            'p-5 rounded-2xl border transition cursor-pointer relative bg-white shadow-sm',
                                            isSelected
                                                ? 'border-[#2a75d0] ring-2 ring-blue-500/10'
                                                : 'border-slate-200 hover:border-slate-300',
                                        ].join(' ')}
                                    >
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-bold text-slate-800">{role.name}</h3>
                                                <p className="text-xs text-slate-500 mt-1">
                                                    {role.permissions.length} Hak Akses Diberikan
                                                </p>
                                            </div>
                                            {role.name !== 'Super Admin' && (
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDeleteRole(role);
                                                    }}
                                                    className="text-xs text-red-500 hover:text-red-700 font-medium"
                                                >
                                                    Hapus
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Matriks Permission (Kanan) */}
                        <div className="lg:col-span-2">
                            {selectedRole ? (
                                <form onSubmit={submitUpdateMatrix} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
                                    <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                                        <div>
                                            <h3 className="font-bold text-slate-800 text-lg">Konfigurasi Hak Akses: {selectedRole.name}</h3>
                                            <p className="text-xs text-slate-500">Centang izin yang ingin diberikan kepada peran ini.</p>
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={matrixForm.processing}
                                            className="bg-[#2a75d0] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition"
                                        >
                                            Simpan Matriks
                                        </button>
                                    </div>

                                    {/* Matriks Berdasarkan Kelompok Modul */}
                                    <div className="space-y-6">
                                        {Object.entries(permissions).map(([group, groupPerms]) => {
                                            const allChecked = groupPerms.every((p) => matrixForm.data.permissions.includes(p.name));
                                            return (
                                                <div key={group} className="border border-slate-100 rounded-xl p-4 bg-slate-50/50">
                                                    <div className="flex justify-between items-center mb-3 pb-2 border-b border-slate-200/60">
                                                        <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                                                            Modul: {group}
                                                        </span>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleSelectAllInGroup(groupPerms)}
                                                            className="text-xs text-[#2a75d0] hover:underline font-medium"
                                                        >
                                                            {allChecked ? 'Batal Pilih Semua' : 'Pilih Semua'}
                                                        </button>
                                                    </div>

                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                        {groupPerms.map((perm) => {
                                                            const checked = matrixForm.data.permissions.includes(perm.name);
                                                            return (
                                                                <div
                                                                    key={perm.id}
                                                                    className="flex items-center justify-between text-sm bg-white p-2.5 rounded-lg border border-slate-200/60 hover:bg-slate-50"
                                                                >
                                                                    <label className="flex items-center gap-3 cursor-pointer flex-1">
                                                                        <input
                                                                            type="checkbox"
                                                                            checked={checked}
                                                                            onChange={() => handlePermissionToggle(perm.name)}
                                                                            className="rounded border-slate-300 text-[#2a75d0] focus:ring-blue-500/20"
                                                                        />
                                                                        <span className="font-mono text-xs text-slate-700">{perm.name}</span>
                                                                    </label>
                                                                    
                                                                    {/* Tombol Hapus Permission spesifik */}
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => handleDeletePermission(perm)}
                                                                        className="text-slate-300 hover:text-red-500 px-1 transition text-xs"
                                                                        title="Hapus permission ini dari sistem"
                                                                    >
                                                                        ✕
                                                                    </button>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </form>
                            ) : (
                                <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center text-slate-500">
                                    <p className="text-sm">Pilih salah satu peran di sebelah kiri untuk mengatur hak aksesnya.</p>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>

            {/* Modal Tambah Permission Baru */}
            {isCreatePermissionModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4">
                        <h3 className="font-bold text-lg text-slate-800">Tambah Permission Baru</h3>
                        <form onSubmit={submitCreatePermission} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700">Nama Permission</label>
                                <input
                                    type="text"
                                    required
                                    value={createPermissionForm.data.name}
                                    onChange={(e) => createPermissionForm.setData('name', e.target.value)}
                                    placeholder="Format: modul.aksi (contoh: reports.export)"
                                    className="mt-1 block w-full rounded-xl border-slate-200 text-sm px-3 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-mono"
                                />
                                <p className="text-[11px] text-slate-400 mt-1">
                                    Gunakan format <code className="bg-slate-100 px-1 rounded">modul.tindakan</code> agar otomatis dikelompokkan ke modul tersebut.
                                </p>
                                {createPermissionForm.errors.name && (
                                    <p className="text-xs text-red-600 mt-1">{createPermissionForm.errors.name}</p>
                                )}
                            </div>

                            <div className="flex justify-end gap-2 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsCreatePermissionModalOpen(false)}
                                    className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={createPermissionForm.processing}
                                    className="bg-[#2a75d0] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-700"
                                >
                                    Simpan Permission
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal Tambah Role Baru */}
            {isCreateRoleModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4">
                        <h3 className="font-bold text-lg text-slate-800">Tambah Peran Baru</h3>
                        <form onSubmit={submitCreateRole} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700">Nama Peran</label>
                                <input
                                    type="text"
                                    required
                                    value={createRoleForm.data.name}
                                    onChange={(e) => createRoleForm.setData('name', e.target.value)}
                                    placeholder="Misal: Finance Manager"
                                    className="mt-1 block w-full rounded-xl border-slate-200 text-sm px-3 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                />
                                {createRoleForm.errors.name && (
                                    <p className="text-xs text-red-600 mt-1">{createRoleForm.errors.name}</p>
                                )}
                            </div>

                            <div className="flex justify-end gap-2 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsCreateRoleModalOpen(false)}
                                    className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={createRoleForm.processing}
                                    className="bg-[#2a75d0] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-700"
                                >
                                    Simpan Peran
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}