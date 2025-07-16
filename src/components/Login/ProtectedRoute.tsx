import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import PopupAlert from "../Common/PopupAlert";

interface ProtectedRouteProps {
  requiredRole?: string;
  allowForUserOnly?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  requiredRole,
  allowForUserOnly = false,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [showUnauthorizedPopup, setShowUnauthorizedPopup] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
    setToken(storedToken);
    setRole(storedRole);
    setChecking(false);
  }, []);

  const isAuthorized = () => {
    if (!requiredRole && !allowForUserOnly) return true;

    const userRole = role?.trim().toUpperCase();

    if (requiredRole) {
      return userRole === requiredRole.trim().toUpperCase();
    }

    if (allowForUserOnly) {
      // Allow ADMIN always
      if (userRole === "ADMIN") return true;
      // Allow USER only for /admin/discounts/customers
      if (
        userRole === "USER" &&
        location.pathname === "/admin/discounts/customers"
      ) {
        return true;
      }
      return false;
    }

    return false;
  };

  useEffect(() => {
    if (!checking) {
      if (!token) {
        navigate("/login", { replace: true });
      } else if (!isAuthorized()) {
        setShowUnauthorizedPopup(true);
      }
    }
  }, [
    checking,
    token,
    role,
    requiredRole,
    allowForUserOnly,
    location.pathname,
    navigate,
  ]);

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
