import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../api/axios";

const ProtectedRoute = ({
  children
}: {
  children: JSX.Element;
}) => {
  const [loading, setLoading] = useState(true);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    let mounted = true;

    const check = async () => {
      try {
        const res = await api.get("/auth/refresh");

        if (mounted && res.data && res.data.success) {
          setAuthed(true);
        }
      } catch (err) {
        setAuthed(false);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    check();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <div>Loading...</div>;

  if (!authed) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;