"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { SuperAdminSidebar } from "@/components/SuperAdminSidebar";
import { SuperAdminMobileNav } from "@/components/SuperAdminMobileNav";

export default function SuperAdminPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, hydrated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!hydrated) return;
    if (!user) {
      router.replace("/login");
      return;
    }
    if (user.role !== "SUPER_ADMIN") {
      router.replace("/login");
    }
  }, [hydrated, user, router]);

  if (!hydrated || !user || user.role !== "SUPER_ADMIN") {
    return (
      <div className="flex h-screen items-center justify-center bg-[#F7FAF9]">
        <Loader2 className="h-6 w-6 animate-spin text-brand-600" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F7FAF9]">
      <SuperAdminSidebar />
      <main className="flex min-h-screen flex-1 flex-col pb-16 lg:pb-0">
        {children}
      </main>
      <SuperAdminMobileNav />
    </div>
  );
}