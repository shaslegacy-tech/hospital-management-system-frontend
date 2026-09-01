"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  HeartPulse,
  MapPin,
  Search,
  Building2,
  Stethoscope,
  Navigation,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { StarRating } from "@/components/StarRating";
import { cn } from "@/lib/cn";
import { useGeolocation } from "@/lib/hooks/useGeolocation";
import { getNearbyHospitals, getNearbyDoctors, geocodeLocation } from "@/lib/api";
import { NearbyHospital, NearbyDoctor } from "@/lib/types";
import { formatCurrency, initials } from "@/lib/format";

type Tab = "hospitals" | "doctors";

export default function BrowsePage() {
  const { coords, setCoords, loading: locLoading, error: locError, requestLocation } =
    useGeolocation();

  const [tab, setTab] = useState<Tab>("hospitals");
  const [cityQuery, setCityQuery] = useState("");
  const [geocoding, setGeocoding] = useState(false);
  const [geocodeError, setGeocodeError] = useState("");

  const [hospitals, setHospitals] = useState<NearbyHospital[]>([]);
  const [doctors, setDoctors] = useState<NearbyDoctor[]>([]);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    if (!coords) return;
    setSearching(true);
    Promise.all([
      getNearbyHospitals({ lat: coords.lat, lng: coords.lng, radiusKm: 50 }),
      getNearbyDoctors({ lat: coords.lat, lng: coords.lng, radiusKm: 50 }),
    ])
      .then(([h, d]) => {
        setHospitals(h);
        setDoctors(d);
      })
      .catch(() => {
        setHospitals([]);
        setDoctors([]);
      })
      .finally(() => setSearching(false));
  }, [coords]);

  async function handleCitySearch(e: React.FormEvent) {
    e.preventDefault();
    if (!cityQuery.trim()) return;
    setGeocoding(true);
    setGeocodeError("");
    try {
      const result = await geocodeLocation(cityQuery);
      setCoords(result);
    } catch {
      setGeocodeError("Couldn't find that location. Try a different search.");
    } finally {
      setGeocoding(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#F7FAF9]">
      {/* Top bar */}
      <header className="flex items-center justify-between border-b border-ink-100 bg-white px-6 py-4 lg:px-10">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-700 text-white">
            <HeartPulse className="h-5 w-5" />
          </div>
          <span className="font-display text-lg font-semibold text-ink-900">
            MedCare
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/register-hospital" className="hidden text-sm font-medium text-ink-500 hover:text-ink-900 sm:block">
            List your hospital
          </Link>
          <Link href="/login">
            <Button size="sm" variant="secondary">
              Sign in
            </Button>
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-10 lg:px-10">
        {/* Hero + location search */}
        <div className="text-center">
          <h1 className="font-display text-3xl font-semibold text-ink-900 sm:text-4xl">
            Find care near you
          </h1>
          <p className="mt-2 text-ink-500">
            Search hospitals and doctors close to your location
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-xl space-y-3">
          <Button
            size="lg"
            className="w-full"
            onClick={requestLocation}
            loading={locLoading}
          >
            <Navigation className="h-4 w-4" />
            Use my current location
          </Button>

          <div className="flex items-center gap-3 text-xs text-ink-500">
            <div className="h-px flex-1 bg-ink-100" />
            or
            <div className="h-px flex-1 bg-ink-100" />
          </div>

          <form onSubmit={handleCitySearch} className="flex gap-2">
            <Input
              placeholder="Enter your city or area"
              value={cityQuery}
              onChange={(e) => setCityQuery(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" variant="secondary" loading={geocoding}>
              <Search className="h-4 w-4" />
            </Button>
          </form>

          {(locError || geocodeError) && (
            <p className="text-center text-xs text-coral-500">
              {locError || geocodeError}
            </p>
          )}
        </div>

        {/* Results */}
        {coords && (
          <div className="mt-10">
            <div className="mb-4 flex gap-1 rounded-2xl border border-ink-100 bg-white p-1.5 w-fit shadow-card">
              <button
                onClick={() => setTab("hospitals")}
                className={cn(
                  "flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-medium transition-colors",
                  tab === "hospitals" ? "bg-brand-700 text-white" : "text-ink-500 hover:bg-ink-100"
                )}
              >
                <Building2 className="h-3.5 w-3.5" />
                Hospitals ({hospitals.length})
              </button>
              <button
                onClick={() => setTab("doctors")}
                className={cn(
                  "flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-medium transition-colors",
                  tab === "doctors" ? "bg-brand-700 text-white" : "text-ink-500 hover:bg-ink-100"
                )}
              >
                <Stethoscope className="h-3.5 w-3.5" />
                Doctors ({doctors.length})
              </button>
            </div>

            {searching ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-32 w-full" />
                ))}
              </div>
            ) : tab === "hospitals" ? (
              hospitals.length === 0 ? (
                <EmptyState
                  icon={Building2}
                  title="No hospitals found nearby"
                  description="Try a wider search or a different location."
                />
              ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {hospitals.map((h) => (
                    <Card key={h.id} className="flex flex-col gap-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-brand-700 text-sm font-semibold text-white">
                          {initials(h.name)}
                        </div>
                        <span className="flex items-center gap-1 text-xs font-medium text-brand-700">
                          <MapPin className="h-3 w-3" />
                          {h.distanceKm} km
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-ink-900">{h.name}</p>
                        <p className="mt-0.5 text-xs text-ink-500">
                          {h.address}, {h.city}, {h.state}
                        </p>
                        {h.description && (
                          <p className="mt-1.5 line-clamp-2 text-xs text-ink-600">
                            {h.description}
                          </p>
                        )}
                      </div>
                      <Link href="/login" className="mt-auto">
                        <Button size="sm" variant="secondary" className="w-full">
                          Sign in to book
                        </Button>
                      </Link>
                    </Card>
                  ))}
                </div>
              )
            ) : doctors.length === 0 ? (
              <EmptyState
                icon={Stethoscope}
                title="No doctors found nearby"
                description="Try a wider search or a different location."
              />
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {doctors.map((d) => (
                  <Card key={d.id} className="flex flex-col gap-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-brand-700 text-sm font-semibold text-white">
                          {initials(d.doctorName)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-ink-900">{d.doctorName}</p>
                          <p className="text-xs text-ink-500">{d.specialization}</p>
                        </div>
                      </div>
                      <span className="flex items-center gap-1 text-xs font-medium text-brand-700">
                        <MapPin className="h-3 w-3" />
                        {d.distanceKm} km
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-ink-500">
                      <Building2 className="h-3 w-3" />
                      {d.hospitalName}, {d.hospitalCity}
                    </div>

                    {d.averageRating && (
                      <StarRating value={d.averageRating} showValue reviewCount={d.reviewCount} size="sm" />
                    )}

                    <div className="mt-auto flex items-center justify-between border-t border-ink-100 pt-3">
                      <span className="font-display text-sm font-semibold text-ink-900">
                        {formatCurrency(d.consultationFee)}
                      </span>
                      <Link href="/login">
                        <Button size="sm">Sign in to book</Button>
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}