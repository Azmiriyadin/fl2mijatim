"use client";

import { RoleGuard } from "@/components/RoleGuard";

export default function MemberLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleGuard allowedRoles={["USER", "ADMIN"]}>
      <div className="min-h-screen bg-background">
        {children}
      </div>
    </RoleGuard>
  );
}
