import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useEmployeeStore } from "../../store/useEmployeeStore";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const employee = useEmployeeStore((state) => state.employee);
  const [hydrated, setHydrated] = useState(false);

  // Wait for Zustand persist hydration
  useEffect(() => {
    const unsub = useEmployeeStore.persist.onFinishHydration(() =>
      setHydrated(true)
    );

    // fallback in case onFinishHydration doesn't fire
    const timeout = setTimeout(() => setHydrated(true), 100);

    return () => {
      unsub?.();
      clearTimeout(timeout);
    };
  }, []);

  if (!hydrated) return null; // or show <Spinner />

  if (!employee) return <Navigate to="/login" />;

  return children;
};

export default ProtectedRoute;
