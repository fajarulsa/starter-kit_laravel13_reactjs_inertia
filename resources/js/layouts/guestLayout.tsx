import { PropsWithChildren } from 'react';

export default function GuestLayout({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen bg-slate-100 flex flex-col justify-center items-center">
            {/* Langsung merender komponen anak (login.tsx) secara penuh tanpa elemen ekstra */}
            {children}
        </div>
    );
}