import { Award, Stethoscope } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { DoctorResponse } from "@/lib/types";
import { formatCurrency, initials } from "@/lib/format";
import { StarRating } from "@/components/StarRating";

export function DoctorCard({
  doctor,
  onBook,
}: {
  doctor: DoctorResponse;
  onBook: (d: DoctorResponse) => void;
}) {

  // console.log(" 🚀 ~ file: DoctorCard.tsx:22 ~ DoctorCard ~ doctor", doctor);
  
  return (
    <Card className="flex flex-col gap-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_1px_2px_rgba(15,23,42,0.04),0_16px_36px_-14px_rgba(15,118,110,0.28)]">
      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-brand-700 text-sm font-semibold text-white">
          {initials(doctor.doctorName)}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-ink-900">
            {doctor.doctorName}
          </p>
          <p className="truncate text-xs text-ink-500">
            {doctor.specialization}
          </p>
          {doctor.gender && <span className="text-xs text-ink-500">{doctor.gender === "FEMALE" ? "Dr. (F)" : "Dr. (M)"}</span>}
          <StarRating
            value={doctor.averageRating}
            showValue
            reviewCount={doctor.reviewCount}
            size="sm"
          />
        </div>
        <Badge tone={doctor.available ? "teal" : "slate"} className="ml-auto flex-shrink-0">
          {doctor.available ? "Available" : "Unavailable"}
        </Badge>
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-ink-500">
        <span className="flex items-center gap-1">
          <Stethoscope className="h-3.5 w-3.5" /> {doctor.departmentName}
        </span>
        <span className="flex items-center gap-1">
          <Award className="h-3.5 w-3.5" /> {doctor.experienceYears} yrs exp
        </span>
      </div>

      {doctor.bio && (
        <p className="line-clamp-2 text-xs text-ink-500">{doctor.bio}</p>
      )}

      <div className="mt-auto flex items-center justify-between border-t border-ink-100 pt-3.5">
        <span className="font-display text-base font-semibold text-ink-900">
          {formatCurrency(doctor.consultationFee)}
        </span>
        <Button
          size="sm"
          disabled={!doctor.available}
          onClick={() => onBook(doctor)}
        >
          Book visit
        </Button>
      </div>
    </Card>
  );
}