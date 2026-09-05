"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import { useAuth } from "@/lib/auth-context";
import { getMySubscription } from "@/lib/api";

import { AdminSidebar } from "@/components/AdminSidebar";
import { AdminMobileNav } from "@/components/AdminMobileNav";
import { HospitalPendingScreen } from "@/components/HospitalPendingScreen";
import { HospitalExpiredScreen } from "@/components/HospitalExpiredScreen";

type SubscriptionResponse = {
  active: boolean;
};

export default function AdminPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, hydrated } = useAuth();

  const router = useRouter();
  const pathname = usePathname();

  const [subscription, setSubscription] =
    useState<SubscriptionResponse | null>(null);

  const [subscriptionLoading, setSubscriptionLoading] =
    useState(true);

  useEffect(() => {
    if (!hydrated) return;

    if (!user) {
      router.replace("/login");
      return;
    }

    if (user.role !== "ADMIN") {
      router.replace("/login");
    }
  }, [hydrated, user, router]);

  useEffect(() => {
    if (!hydrated || !user) return;

    if (user.role !== "ADMIN") return;

    if (user.hospitalStatus === "PENDING") {
      setSubscriptionLoading(false);
      return;
    }

    let cancelled = false;

    async function fetchSubscription() {
      try {
        setSubscriptionLoading(true);

        const data = await getMySubscription();

        if (!cancelled) {
          setSubscription(data);
        }
      } catch (error) {
        console.error(
          "Failed to fetch subscription status:",
          error
        );

        if (!cancelled) {
          setSubscription(null);
        }
      } finally {
        if (!cancelled) {
          setSubscriptionLoading(false);
        }
      }
    }

    fetchSubscription();

    return () => {
      cancelled = true;
    };
  }, [hydrated, user]);


  if (!hydrated || !user || user.role !== "ADMIN") {
    return (
      <div className="flex h-screen items-center justify-center bg-[#F7FAF9]">
        <Loader2 className="h-6 w-6 animate-spin text-brand-600" />
      </div>
    );
  }

  if (user.hospitalStatus === "PENDING") {
    return (
      <div className="flex min-h-screen bg-[#F7FAF9]">
        <AdminSidebar />

        <main className="flex min-h-screen flex-1 flex-col pb-16 lg:pb-0">
          <HospitalPendingScreen />
        </main>

        <AdminMobileNav />
      </div>
    );
  }

  if (
    subscriptionLoading &&
    pathname !== "/admin/subscription"
  ) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#F7FAF9]">
        <Loader2 className="h-6 w-6 animate-spin text-brand-600" />
      </div>
    );
  }

  if (
    subscription &&
    !subscription.active &&
    pathname !== "/admin/subscription"
  ) {
    return (
      <div className="flex min-h-screen bg-[#F7FAF9]">
        <AdminSidebar />

        <main className="flex min-h-screen flex-1 flex-col pb-16 lg:pb-0">
          <HospitalExpiredScreen />
        </main>

        <AdminMobileNav />
      </div>
    );
  }

  /*
   * Normal admin portal
   */
  return (
    <div className="flex min-h-screen bg-[#F7FAF9]">
      <AdminSidebar />

      <main className="flex min-h-screen flex-1 flex-col pb-16 lg:pb-0">
        {children}
      </main>

      <AdminMobileNav />
    </div>
  );
}