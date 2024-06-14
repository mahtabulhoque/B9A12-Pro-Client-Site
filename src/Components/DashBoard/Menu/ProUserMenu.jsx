import { TbReportMedical } from "react-icons/tb";
import { FaComment } from "react-icons/fa";
import { FcSurvey } from "react-icons/fc";
import { NavLink } from "react-router-dom";

const ProUserMenu = () => {
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
            <li>
                <NavLink to="/dashboard/survey-comment">
                
                <FaComment />
                    Comment</NavLink>
            </li>
        </div>
    );
};

export default ProUserMenu;