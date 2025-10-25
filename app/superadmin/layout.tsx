import SuperAdminSidebar from "@/components/layout/SuperAdminSidebar";

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50 overflow-hidden">
      <SuperAdminSidebar />
      <div className="flex-1 overflow-auto ml-4">
        {children}
      </div>
    </div>
  );
}
