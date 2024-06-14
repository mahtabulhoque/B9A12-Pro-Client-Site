import { NavLink } from "react-router-dom";
import { FcSurvey } from "react-icons/fc";
import { TbReportMedical } from "react-icons/tb";


const UserMenu = () => {
    return (
        <div>
            <li>
                <NavLink to="/dashboard/user-survey">
                <FcSurvey />
                    Surveys</NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/reported-survey">
                
                <TbReportMedical />
                    Reported Survey</NavLink>
            </li>
            
        </div>
    );
};

export default UserMenu;