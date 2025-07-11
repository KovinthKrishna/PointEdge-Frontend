import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import PopupAlert from "../Common/PopupAlert";

interface ProtectedRouteProps {
  requiredRole?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ requiredRole }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const [showUnauthorizedPopup, setShowUnauthorizedPopup] = useState(false);

  useEffect(() => {
    // Show popup if user is logged in but doesn't meet role requirement
    if (
      token &&
      requiredRole &&
      role?.toUpperCase() !== requiredRole.toUpperCase()
    ) {
      setShowUnauthorizedPopup(true);
    }
  }, [requiredRole, token, role]);

  // If user is not logged in at all
  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [token, navigate]);

  if (!token) {
    return null; // wait for navigation
  }

  // If user is not authorized for this route
  if (requiredRole && role?.toUpperCase() !== requiredRole.toUpperCase()) {
    return (
      <>
        <PopupAlert
          isOpen={showUnauthorizedPopup}
          onClose={() => navigate(-1)}
          status="error"
          title="Unauthorized Access"
          description="This page is unauthorized for you."
        />
      </>
    );
  }

  // Authorized → render the route
  return <Outlet />;
};

export default ProtectedRoute;
