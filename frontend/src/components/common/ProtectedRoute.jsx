import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { user, loading, token } = useContext(AuthContext);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        fontFamily: 'sans-serif'
      }}>
        <div>Loading authorization...</div>
      </div>
    );
  }

  // No active session/token
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // Admin access required
  if (requireAdmin && user.IsAdmin !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};
