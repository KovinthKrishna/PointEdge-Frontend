import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import PopupAlert from "../Common/PopupAlert";

interface ProtectedRouteProps {
  requiredRole?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ requiredRole }) => {
  const navigate = useNavigate();

  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [showUnauthorizedPopup, setShowUnauthorizedPopup] = useState(false);
  const [checking, setChecking] = useState(true); // avoid render before checking

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
    setToken(storedToken);
    setRole(storedRole);
    setChecking(false);
  }, []);

  const isAuthorized = () => {
    if (!requiredRole) return true;
    return role?.trim().toUpperCase() === requiredRole.trim().toUpperCase();
  };

  useEffect(() => {
    if (!checking) {
      if (!token) {
        navigate("/login", { replace: true });
      } else if (!isAuthorized()) {
        setShowUnauthorizedPopup(true);
      }
    }
  }, [checking, token, role, requiredRole, navigate]);

  if (checking) return null;

  if (!token) return <div>Redirecting to login...</div>;

  if (!isAuthorized()) {
    return (
      <PopupAlert
        isOpen={showUnauthorizedPopup}
        onClose={() => navigate(-1)}
        status="error"
        title="Unauthorized Access"
        description="This page is unauthorized for you."
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
