import Sidebar from '@/components/Sidebar';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Sidebar />
            <main className="flex-1 py-6 md:px-8">
                {children}
            </main>
        </div>
    );
}
