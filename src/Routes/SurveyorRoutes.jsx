import { Navigate } from "react-router-dom";
import useRole from "../Hooks/useRole";


const SurveyorRoutes = ({children}) => {
    const [role, isLoading] = useRole;
    if(isLoading) return <progress className="progress w-56"></progress>
    if(role === 'Surveyor') return children
    return <Navigate to='/dashboard'></Navigate>
};

export default SurveyorRoutes;