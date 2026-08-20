"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import type {
  AuthResponse,
  CaregiverLink,
  DoctorResponse,
  PatientResponse,
} from "./types";

import {
  getDoctorByUserId,
  getPatientByUserId,
  getMyManagedPatients,
} from "./api";

interface AuthContextValue {
  user: AuthResponse | null;

  patient: PatientResponse | null;
  patientLoading: boolean;
  patientMissing: boolean;

  doctor: DoctorResponse | null;
  doctorLoading: boolean;
  doctorMissing: boolean;

  hydrated: boolean;

  setSession: (auth: AuthResponse) => void;
  logout: () => void;

  refreshPatient: () => Promise<void>;
  refreshDoctor: () => Promise<void>;

  // Caregiver / "acting as" support
  managedPatients: CaregiverLink[];
  activePatientId: number | null;
  activePatientName: string | null;
  isActingAsCaregiver: boolean;

  switchToOwnProfile: () => void;
  switchToManagedPatient: (link: CaregiverLink) => void;
  refreshManagedPatients: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const ACTIVE_PATIENT_KEY = "hms_active_patient";

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<AuthResponse | null>(null);

  const [patient, setPatient] =
    useState<PatientResponse | null>(null);

  const [patientLoading, setPatientLoading] =
    useState(false);

  const [patientMissing, setPatientMissing] =
    useState(false);

  const [doctor, setDoctor] =
    useState<DoctorResponse | null>(null);

  const [doctorLoading, setDoctorLoading] =
    useState(false);

  const [doctorMissing, setDoctorMissing] =
    useState(false);

  const [hydrated, setHydrated] =
    useState(false);

  const [managedPatients, setManagedPatients] =
    useState<CaregiverLink[]>([]);

  const [activePatientId, setActivePatientId] =
    useState<number | null>(null);

  const [activePatientName, setActivePatientName] =
    useState<string | null>(null);

  // ============================================================
  // Restore session
  // ============================================================

  useEffect(() => {
    const raw = localStorage.getItem("hms_user");

    if (raw) {
      try {
        setUser(JSON.parse(raw));
      } catch {
        localStorage.removeItem("hms_user");
        localStorage.removeItem("hms_token");
      }
    }

    setHydrated(true);
  }, []);

  // ============================================================
  // Patient
  // ============================================================

  const refreshPatient = useCallback(async () => {
    if (!user || user.role !== "PATIENT") {
      return;
    }

    setPatientLoading(true);
    setPatientMissing(false);

    try {
      const data = await getPatientByUserId(user.userId);

      setPatient(data);

      // Default active patient = own profile
      setActivePatientId((prev) => prev ?? data.id);
    } catch {
      setPatient(null);
      setPatientMissing(true);
    } finally {
      setPatientLoading(false);
    }
  }, [user]);

  // ============================================================
  // Doctor
  // ============================================================

  const refreshDoctor = useCallback(async () => {
    if (!user || user.role !== "DOCTOR") {
      return;
    }

    setDoctorLoading(true);
    setDoctorMissing(false);

    try {
      const data = await getDoctorByUserId(user.userId);

      setDoctor(data);
    } catch {
      setDoctor(null);
      setDoctorMissing(true);
    } finally {
      setDoctorLoading(false);
    }
  }, [user]);

  // ============================================================
  // Managed patients
  //
  // IMPORTANT:
  // Caregiver is NOT a user role anymore.
  // A PATIENT can still have CaregiverLink relationships.
  // ============================================================

  const refreshManagedPatients = useCallback(async () => {
    if (!user || user.role !== "PATIENT") {
      return;
    }

    try {
      const data = await getMyManagedPatients();

      setManagedPatients(data);
    } catch {
      setManagedPatients([]);
    }
  }, [user]);

  // ============================================================
  // Load role-specific data
  // ============================================================

  useEffect(() => {
    if (!user) {
      return;
    }

    if (user.role === "PATIENT") {
      refreshPatient();
      refreshManagedPatients();
    }

    if (user.role === "DOCTOR") {
      refreshDoctor();
    }
  }, [
    user,
    refreshPatient,
    refreshDoctor,
    refreshManagedPatients,
  ]);

  // ============================================================
  // Restore active managed patient
  // ============================================================

  useEffect(() => {
    if (!patient) {
      return;
    }

    const saved =
      localStorage.getItem(ACTIVE_PATIENT_KEY);

    if (saved) {
      try {
        const { id, name } = JSON.parse(saved);

        if (id !== patient.id) {
          setActivePatientId(id);
          setActivePatientName(name);
          return;
        }
      } catch {
        localStorage.removeItem(ACTIVE_PATIENT_KEY);
      }
    }

    // Own profile
    setActivePatientId(patient.id);
    setActivePatientName(patient.patientName);
  }, [patient]);

  // ============================================================
  // Switch to own profile
  // ============================================================

  const switchToOwnProfile = useCallback(() => {
    if (!patient) {
      return;
    }

    setActivePatientId(patient.id);
    setActivePatientName(patient.patientName);

    localStorage.removeItem(ACTIVE_PATIENT_KEY);
  }, [patient]);

  // ============================================================
  // Switch to managed patient
  // ============================================================

  const switchToManagedPatient = useCallback(
    (link: CaregiverLink) => {
      setActivePatientId(link.patientId);
      setActivePatientName(link.patientName);

      localStorage.setItem(
        ACTIVE_PATIENT_KEY,
        JSON.stringify({
          id: link.patientId,
          name: link.patientName,
        })
      );
    },
    []
  );

  // ============================================================
  // Login / Session
  // ============================================================

  const setSession = (auth: AuthResponse) => {
    localStorage.setItem(
      "hms_token",
      auth.token
    );

    localStorage.setItem(
      "hms_user",
      JSON.stringify(auth)
    );

    // Clear previous patient context
    localStorage.removeItem(ACTIVE_PATIENT_KEY);

    setUser(auth);
    setPatient(null);
    setDoctor(null);
    setManagedPatients([]);
    setActivePatientId(null);
    setActivePatientName(null);
  };

  // ============================================================
  // Logout
  // ============================================================

  const logout = () => {
    localStorage.removeItem("hms_token");
    localStorage.removeItem("hms_user");
    localStorage.removeItem(ACTIVE_PATIENT_KEY);

    setUser(null);

    setPatient(null);
    setDoctor(null);

    setManagedPatients([]);

    setActivePatientId(null);
    setActivePatientName(null);

    window.location.href = "/login";
  };

  // ============================================================
  // Context
  // ============================================================

  return (
    <AuthContext.Provider
      value={{
        user,

        patient,
        patientLoading,
        patientMissing,

        doctor,
        doctorLoading,
        doctorMissing,

        hydrated,

        setSession,
        logout,

        refreshPatient,
        refreshDoctor,

        managedPatients,

        activePatientId,
        activePatientName,

        isActingAsCaregiver:
          !!patient &&
          activePatientId !== patient.id,

        switchToOwnProfile,
        switchToManagedPatient,

        refreshManagedPatients,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return ctx;
}