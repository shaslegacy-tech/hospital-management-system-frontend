"use client";

import { useEffect, useState } from "react";
import { Search, Stethoscope, ChevronLeft, ChevronRight } from "lucide-react";
import { Topbar } from "@/components/Topbar";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Skeleton } from "@/components/ui/Skeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { DoctorCard } from "@/components/DoctorCard";
import { SymptomChecker } from "@/components/SymptomChecker";
import { BookAppointmentModal } from "@/components/BookAppointmentModal";
import { getDepartments, searchDoctors } from "@/lib/api";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { useToast } from "@/lib/toast-context";
import { DepartmentResponse, DoctorResponse } from "@/lib/types";

const PAGE_SIZE = 9;

export default function DoctorsPage() {
  const { showToast } = useToast();
  const [departments, setDepartments] = useState<DepartmentResponse[]>([]);
  const [doctors, setDoctors] = useState<DoctorResponse[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [availableOnly, setAvailableOnly] = useState(false);

  const [selectedDoctor, setSelectedDoctor] = useState<DoctorResponse | null>(
    null
  );

   const [gender, setGender] = useState("");

  const { t } = useTranslation();

  useEffect(() => {
    getDepartments().then(setDepartments).catch(() => {});
  }, []);

  async function load(overrideDepartmentId?: string) {
    setLoading(true);
    try {
      const data = await searchDoctors({
        name: name || undefined,
        departmentId: (overrideDepartmentId ?? departmentId)
          ? Number(overrideDepartmentId ?? departmentId)
          : undefined,
        gender: gender || undefined,
        available: availableOnly ? true : undefined,
        page,
        size: PAGE_SIZE,
      });
      setDoctors(data.content);
      setTotalPages(data.totalPages || 1);
    } catch {
      setDoctors([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setPage(0);
    load();
  }

  function handleDepartmentSuggested(departmentName: string) {
    const match = departments.find(
      (d) => d.name.toLowerCase() === departmentName.toLowerCase()
    );
    if (match) {
      setDepartmentId(String(match.id));
      setPage(0);
      load(String(match.id));
    }
  }

  async function handleBooked() {
    setSelectedDoctor(null);
    showToast(t("doctors.appointmentBooked"), "success");
  }

  return (
    <>
      <Topbar
        title={t("doctors.title")}
        subtitle={t("doctors.subtitle")}
      />

      <div className="space-y-6 px-6 pb-10 lg:px-10">
        <SymptomChecker onDepartmentSuggested={handleDepartmentSuggested} />

        <form
          onSubmit={handleSearch}
          className="grid grid-cols-1 gap-3 rounded-2xl border border-ink-100 bg-white p-4 shadow-card sm:grid-cols-[1fr_1fr_auto_auto]"
        >
          <Input
            placeholder={t("doctors.searchPlaceholder")}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Select
            value={departmentId}
            onChange={(e) => setDepartmentId(e.target.value)}
          >
            <option value="">{t("doctors.allDepartments")}</option>
            {departments.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </Select>
          <Select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Any Gender</option>
              <option value="FEMALE">Female doctors</option>
              <option value="MALE">Male doctors</option>
          </Select>
          <label className="flex items-center gap-2 rounded-xl border border-ink-100 px-3.5 text-sm text-ink-700">
            <input
              type="checkbox"
              checked={availableOnly}
              onChange={(e) => setAvailableOnly(e.target.checked)}
              className="h-4 w-4 rounded accent-brand-600"
            />
            {t("doctors.availableNow")}
          </label>
          <Button type="submit">
            <Search className="h-4 w-4" />
            {t("doctors.search")}
          </Button>
        </form>

        {loading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-56 w-full" />
            ))}
          </div>
        ) : doctors.length === 0 ? (
          <EmptyState
            icon={Stethoscope}
            title={t("doctors.noDoctorsFound")}
            description={t("doctors.noDoctorsDescription")}
          />
        ) : (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {doctors.map((d) => (
                <DoctorCard
                  key={d.id}
                  doctor={d}
                  onBook={setSelectedDoctor}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-3 pt-2">
                <Button
                  variant="secondary"
                  size="sm"
                  disabled={page === 0}
                  onClick={() => setPage((p) => p - 1)}
                >
                  <ChevronLeft className="h-4 w-4" />
                  {t("doctors.previous")}
                </Button>
                <span className="text-sm text-ink-500">
                  {t("doctors.page")} {page + 1} {t("doctors.of")} {totalPages}
                </span>
                <Button
                  variant="secondary"
                  size="sm"
                  disabled={page >= totalPages - 1}
                  onClick={() => setPage((p) => p + 1)}
                >
                  {t("doctors.next")}
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      <BookAppointmentModal
        doctor={selectedDoctor}
        onClose={() => setSelectedDoctor(null)}
        onBooked={handleBooked}
      />
    </>
  );
}