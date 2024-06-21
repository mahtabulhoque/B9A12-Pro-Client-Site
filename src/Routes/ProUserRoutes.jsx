
import useRole from '../Hooks/useRole';
import { Navigate } from 'react-router-dom';

const ProUserRoutes = ({children}) => {
    const [role, isLoading] = useRole();
    if(isLoading) return <progress className="progress w-56"></progress>
    if(role === 'Pro-User') return children
    return <Navigate to='/dashboard'></Navigate>
};

export default ProUserRoutes;