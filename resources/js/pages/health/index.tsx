import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/authenticatedLayout';

interface HealthProps {
    health: {
        database: {
            status: string;
            latency_ms: number;
            connection: string;
        };
        storage: {
            total_gb: number;
            used_gb: number;
            free_gb: number;
            used_percentage: number;
        };
        system: {
            php_version: string;
            laravel_version: string;
            environment: string;
            debug_mode: boolean;
            timezone: string;
            cache_driver: string;
        };
    };
}

export default function SystemHealthIndex({ health }: HealthProps) {
    return (
        <AuthenticatedLayout>
            <Head title="System Health & Infrastructure" />

            <div className="py-8 max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                <div>
                    <h2 className="text-xl font-bold text-slate-800">System Health & Infrastructure</h2>
                    <p className="text-sm text-slate-500">Pemantauan performa server, penggunaan memori penyimpanan, dan runtime database secara real-time.</p>
                </div>

                {/* Grid Kartu Utama */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    {/* Kartu Status Database */}
                    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Database Engine</span>
                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                                health.database.status === 'OK' 
                                    ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                                    : 'bg-red-50 text-red-600 border border-red-100'
                            }`}>
                                {health.database.status}
                            </span>
                        </div>
                        <div>
                            <p className="text-3xl font-black text-slate-800">
                                {health.database.latency_ms} <span className="text-sm font-normal text-slate-500">ms</span>
                            </p>
                            <p className="text-xs text-slate-400 mt-1">
                                Driver Connection: <span className="font-mono font-semibold text-slate-600">{health.database.connection}</span>
                            </p>
                        </div>
                    </div>

                    {/* Kartu Status Disk Storage */}
                    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Penyimpanan Disk</span>
                            <span className="text-xs font-semibold text-slate-600">{health.storage.used_percentage}% Terpakai</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                            <div
                                className={`h-full transition-all duration-500 ${
                                    health.storage.used_percentage > 85 ? 'bg-red-500' : 'bg-[#2a75d0]'
                                }`}
                                style={{ width: `${health.storage.used_percentage}%` }}
                            ></div>
                        </div>
                        <div className="flex justify-between text-xs text-slate-500">
                            <span>Terpakai: {health.storage.used_gb} GB</span>
                            <span>Bebas: {health.storage.free_gb} GB</span>
                        </div>
                    </div>

                    {/* Kartu Status Framework & Runtime */}
                    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Lingkungan Kerja</span>
                            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-[#2a75d0] border border-blue-100 uppercase">
                                {health.system.environment}
                            </span>
                        </div>
                        <div>
                            <p className="text-xl font-bold text-slate-800">Laravel v{health.system.laravel_version}</p>
                            <p className="text-xs text-slate-400 mt-1">
                                PHP Engine: <span className="font-mono font-semibold text-slate-600">{health.system.php_version}</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Tabel Spesifikasi Server & Konfigurasi Cache */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                    <h3 className="font-bold text-slate-800 text-sm">Spesifikasi Server & Driver Configuration</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                        <div className="p-4 bg-slate-50/60 rounded-xl border border-slate-100">
                            <p className="text-xs text-slate-400">Cache Driver</p>
                            <p className="text-sm font-semibold text-slate-700 font-mono mt-1">{health.system.cache_driver}</p>
                        </div>
                        <div className="p-4 bg-slate-50/60 rounded-xl border border-slate-100">
                            <p className="text-xs text-slate-400">Zona Waktu</p>
                            <p className="text-sm font-semibold text-slate-700 mt-1">{health.system.timezone}</p>
                        </div>
                        <div className="p-4 bg-slate-50/60 rounded-xl border border-slate-100">
                            <p className="text-xs text-slate-400">App Debug Mode</p>
                            <p className="text-sm font-semibold text-slate-700 mt-1">
                                {health.system.debug_mode ? 'Enabled (True)' : 'Disabled (False)'}
                            </p>
                        </div>
                        <div className="p-4 bg-slate-50/60 rounded-xl border border-slate-100">
                            <p className="text-xs text-slate-400">Status Keseluruhan</p>
                            <p className="text-sm font-bold text-emerald-600 mt-1 flex items-center gap-1.5">
                                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                Operational
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}