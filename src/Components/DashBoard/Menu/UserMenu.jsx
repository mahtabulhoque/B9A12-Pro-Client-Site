import { NavLink } from "react-router-dom";
import { FcSurvey } from "react-icons/fc";
import { TbReportMedical } from "react-icons/tb";

const UserMenu = () => {
    return (
        <div>
            <li>
                <NavLink to="/dashboard/create">
                <FcSurvey />
                    Surveys</NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/surveys">
                
                <TbReportMedical />
                    Reported Survey</NavLink>
            </li>
        </div>
    );
};

export default UserMenu;