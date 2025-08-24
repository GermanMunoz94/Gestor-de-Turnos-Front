import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';


export default function RequireAuth({ children, role }) {
    const { user } = useAuth();
    if (!user) return <Navigate to="/login" />;
    if (role && user.role !== role) return <p>No autorizado</p>;
    return children;
}