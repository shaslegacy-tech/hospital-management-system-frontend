"use client";

import { useEffect, useState } from "react";
import { UserPlus, Trash2, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { useToast } from "@/lib/toast-context";
import { useAuth } from "@/lib/auth-context";
import {
  addCaregiver,
  getMyCaregivers,
  removeCaregiverLink,
  apiErrorMessage,
} from "@/lib/api";
import { CaregiverLink } from "@/lib/types";
import { initials } from "@/lib/format";

export function CaregiversSection() {
  const { showToast } = useToast();
  const { refreshManagedPatients } = useAuth();
  const [caregivers, setCaregivers] = useState<CaregiverLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState("");
  const [relationship, setRelationship] = useState("");
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState("");
  const [removeTarget, setRemoveTarget] = useState<CaregiverLink | null>(null);
  const [removing, setRemoving] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const data = await getMyCaregivers();
      setCaregivers(data);
    } catch {
      setCaregivers([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setAdding(true);
    try {
      await addCaregiver({ caregiverEmail: email, relationship });
      showToast("Caregiver added.", "success");
      setEmail("");
      setRelationship("");
      setShowForm(false);
      await load();
    } catch (err) {
      setError(apiErrorMessage(err, "Couldn't add this caregiver."));
    } finally {
      setAdding(false);
    }
  }

  async function handleRemove() {
    if (!removeTarget) return;
    setRemoving(true);
    try {
      await removeCaregiverLink(removeTarget.id);
      showToast("Caregiver access removed.", "success");
      await load();
    } finally {
      setRemoving(false);
      setRemoveTarget(null);
    }
  }

  return (
    <Card>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="font-display text-base font-semibold text-ink-900">
            Family &amp; caregivers
          </h3>
          <p className="mt-0.5 text-xs text-ink-500">
            People you have given access to help manage your appointments and records
          </p>
        </div>
        <Button size="sm" variant="secondary" onClick={() => setShowForm((s) => !s)}>
          <UserPlus className="h-3.5 w-3.5" />
          Add
        </Button>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className="mb-4 space-y-3 rounded-xl bg-brand-50/60 p-3.5">
          <Alert tone="info">
            <span className="flex items-start gap-1.5">
              <ShieldCheck className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
              They must already have a MedCare account registered with this email.
            </span>
          </Alert>
          <Input
            type="email"
            label="Their email"
            placeholder="family.member@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="Relationship"
            placeholder="e.g. Son, Daughter, Spouse"
            value={relationship}
            onChange={(e) => setRelationship(e.target.value)}
            required
          />
          {error && <Alert tone="error">{error}</Alert>}
          <Button type="submit" size="sm" loading={adding}>
            Grant access
          </Button>
        </form>
      )}

      {!loading && caregivers.length === 0 ? (
        <p className="text-sm text-ink-500">No caregivers added yet.</p>
      ) : (
        <div className="space-y-2">
          {caregivers.map((c) => (
            <div
              key={c.id}
              className="flex items-center gap-3 rounded-xl border border-ink-100 px-3.5 py-2.5"
            >
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-brand-700 text-xs font-semibold text-white">
                {initials(c.caregiverName)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-ink-900">
                  {c.caregiverName}
                </p>
                <p className="text-xs text-ink-500">
                  {c.relationship} · {c.caregiverEmail}
                </p>
              </div>
              <button
                onClick={() => setRemoveTarget(c)}
                className="flex-shrink-0 rounded-lg p-1.5 text-ink-500 hover:bg-coral-50 hover:text-coral-600"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={removeTarget !== null}
        title="Remove caregiver access?"
        description={`"${removeTarget?.caregiverName}" will no longer be able to view or manage your account.`}
        confirmLabel="Remove"
        loading={removing}
        onConfirm={handleRemove}
        onClose={() => setRemoveTarget(null)}
      />
    </Card>
  );
}