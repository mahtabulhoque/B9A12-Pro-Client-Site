import { NavLink } from "react-router-dom";
import { IoCreateOutline} from "react-icons/io5";
import { GrDocumentUpdate } from "react-icons/gr";

const SurveyorMenu = () => {
    return (
        <div>
            <li>
                <NavLink to="/dashboard/create">
                   <IoCreateOutline />
                    Create Survey</NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/view">
                <GrDocumentUpdate />
                  
                    View & Update</NavLink>
            </li>
        </div>
    );
};

export default SurveyorMenu;