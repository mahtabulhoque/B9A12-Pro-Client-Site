import { IoCreateOutline} from "react-icons/io5";
import { FaRegEye,FaCreativeCommons,FaHome } from "react-icons/fa";
import { NavLink} from "react-router-dom";

const SideBar = () => {
  return (
    <div className="flex">
    {/* dashboard side bar */}
    <div className="w-64 min-h-screen bg-blue-500">
        <ul className="menu p-4">
            <li>
                <NavLink to="/dashboard" end>
                <FaCreativeCommons />
                    Common</NavLink>
            </li>
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
           
           
           
            <div className="divider"></div>
            <li>
                <NavLink to="/">
                    <FaHome></FaHome>
                    Home</NavLink>
            </li>
        </ul>
    </div>
</div>
  );
};

export default SideBar;
