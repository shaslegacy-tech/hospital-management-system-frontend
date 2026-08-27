"use client";

import { useState } from "react";
import Link from "next/link";
import { Building2, CheckCircle2 } from "lucide-react";
import { AuthShell } from "@/components/AuthShell";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { registerHospital, apiErrorMessage } from "@/lib/api";

export default function RegisterHospitalPage() {
  const [form, setForm] = useState({
    hospitalName: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    description: "",
    contactPhone: "",
    adminName: "",
    adminEmail: "",
    adminPassword: "",
    adminPhone: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function update(key: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await registerHospital(form);
      setSuccess(true);
    } catch (err) {
      setError(apiErrorMessage(err, "Couldn't register your hospital. Please check your details."));
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <AuthShell>
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-100 text-brand-700">
            <CheckCircle2 className="h-7 w-7" />
          </div>
          <h2 className="mt-4 font-display text-xl font-semibold text-ink-900">
            Registration submitted
          </h2>
          <p className="mt-2 text-sm text-ink-500">
            Thanks! Your hospital is now pending review. We&apos;ll notify you at{" "}
            <span className="font-medium text-ink-700">{form.adminEmail}</span> once
            approved — usually within 1-2 business days. You&apos;ll be able to log in
            as your hospital&apos;s admin as soon as it&apos;s live.
          </p>
          <Link href="/login">
            <Button className="mt-6 w-full">Back to sign in</Button>
          </Link>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell>
      <div className="mb-6 flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-700 text-white">
          <Building2 className="h-5 w-5" />
        </div>
        <span className="font-display text-lg font-semibold text-ink-900">
          List your hospital
        </span>
      </div>

      <h2 className="font-display text-2xl font-semibold text-ink-900">
        Join the platform
      </h2>
      <p className="mt-1.5 text-sm text-ink-500">
        Register your hospital and get discovered by patients near you.
      </p>

      <form onSubmit={handleSubmit} className="mt-7 space-y-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">
          Hospital details
        </p>
        <Input
          label="Hospital name"
          value={form.hospitalName}
          onChange={(e) => update("hospitalName", e.target.value)}
          required
        />
        <Input
          label="Address"
          value={form.address}
          onChange={(e) => update("address", e.target.value)}
          required
        />
        <div className="grid grid-cols-3 gap-3">
          <Input
            label="City"
            value={form.city}
            onChange={(e) => update("city", e.target.value)}
            required
          />
          <Input
            label="State"
            value={form.state}
            onChange={(e) => update("state", e.target.value)}
            required
          />
          <Input
            label="Pincode"
            value={form.pincode}
            onChange={(e) => update("pincode", e.target.value)}
            required
          />
        </div>
        <Input
          type="tel"
          label="Contact phone"
          value={form.contactPhone}
          onChange={(e) => update("contactPhone", e.target.value)}
          required
        />
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-ink-700">
            Description (optional)
          </label>
          <textarea
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            rows={2}
            placeholder="A short description patients will see"
            className="w-full rounded-xl border border-ink-100 bg-white px-3.5 py-2.5 text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        <hr className="border-ink-100" />
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">
          Your admin account
        </p>
        <Input
          label="Your full name"
          value={form.adminName}
          onChange={(e) => update("adminName", e.target.value)}
          required
        />
        <div className="grid grid-cols-2 gap-3">
          <Input
            type="email"
            label="Email"
            value={form.adminEmail}
            onChange={(e) => update("adminEmail", e.target.value)}
            required
          />
          <Input
            type="tel"
            label="Your phone"
            value={form.adminPhone}
            onChange={(e) => update("adminPhone", e.target.value)}
            required
          />
        </div>
        <Input
          type="password"
          label="Password"
          placeholder="At least 6 characters"
          value={form.adminPassword}
          onChange={(e) => update("adminPassword", e.target.value)}
          required
          minLength={6}
        />

        {error && <Alert tone="error">{error}</Alert>}

        <Button type="submit" className="w-full" size="lg" loading={loading}>
          Submit for review
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-ink-500">
        Already registered?{" "}
        <Link href="/login" className="font-semibold text-brand-700 hover:text-brand-800">
          Sign in
        </Link>
      </p>
    </AuthShell>
  );
}