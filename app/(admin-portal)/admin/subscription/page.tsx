"use client";
 
import { useEffect, useState } from "react";
import { CheckCircle2, Clock } from "lucide-react";
import { Topbar } from "@/components/Topbar";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { SubscribeButton } from "@/components/SubscribeButton";
import { getMySubscription } from "@/lib/api";
import { Subscription } from "@/lib/types";
import { formatDate } from "@/lib/format";
 
const plans = [
  { id: "BASIC" as const, name: "Basic", price: 2999, features: ["Up to 10 doctors", "Standard support", "Core booking features"] },
  { id: "PREMIUM" as const, name: "Premium", price: 7999, features: ["Unlimited doctors", "Priority support", "Featured in nearby search", "Advanced analytics"] },
];
 
export default function SubscriptionPage() {
  const [sub, setSub] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
 
  async function load() {
    setLoading(true);
    try {
      setSub(await getMySubscription());
    } finally {
      setLoading(false);
    }
  }
 
  useEffect(() => { load(); }, []);
 
  return (
    <>
      <Topbar title="Subscription" subtitle="Manage your hospital's plan" profileHref="/admin/dashboard" />
 
      <div className="space-y-6 px-6 pb-10 lg:px-10">
        {sub && (
          <Card className="flex items-center gap-4">
            <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${sub.active ? "bg-brand-100 text-brand-700" : "bg-coral-100 text-coral-600"}`}>
              {sub.active ? <CheckCircle2 className="h-5 w-5" /> : <Clock className="h-5 w-5" />}
            </div>
            <div>
              <p className="font-display text-lg font-semibold text-ink-900">
                {sub.plan} plan
              </p>
              <p className="text-xs text-ink-500">
                {sub.expiresAt ? `${sub.active ? "Renews" : "Expired"} ${formatDate(sub.expiresAt)}` : "No active plan"}
              </p>
            </div>
            <Badge tone={sub.active ? "teal" : "coral"} className="ml-auto">
              {sub.active ? "Active" : "Expired"}
            </Badge>
          </Card>
        )}
 
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {plans.map((p) => (
            <Card key={p.id} className="flex flex-col gap-4">
              <div>
                <p className="font-display text-lg font-semibold text-ink-900">{p.name}</p>
                <p className="mt-1 text-2xl font-display font-semibold text-brand-700">
                  ₹{p.price.toLocaleString("en-IN")}<span className="text-sm text-ink-500">/month</span>
                </p>
              </div>
              <ul className="space-y-1.5 text-sm text-ink-700">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-brand-600" />
                    {f}
                  </li>
                ))}
              </ul>
              <SubscribeButton plan={p.id} onSubscribed={load} />
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
