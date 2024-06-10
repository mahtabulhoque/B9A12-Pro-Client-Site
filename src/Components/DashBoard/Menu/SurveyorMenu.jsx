import { NavLink } from "react-router-dom";
import { IoCreateOutline} from "react-icons/io5";
import { FaRegEye} from "react-icons/fa";

const SurveyorMenu = () => {
    return (
        <div>
            <li>
                <NavLink to="/dashboard/create">
                   <IoCreateOutline />
                    Create Survey</NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/surveys">
                <FaRegEye />
                  
                    View</NavLink>
            </li>
        </div>
    );
};

export default SurveyorMenu;