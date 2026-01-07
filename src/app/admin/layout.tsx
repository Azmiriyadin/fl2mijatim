"use client";

import { RoleGuard } from "@/components/RoleGuard";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleGuard allowedRoles={["ADMIN"]}>
      <div className="min-h-screen bg-muted/30">
        {children}
      </div>
    </RoleGuard>
  );
}
