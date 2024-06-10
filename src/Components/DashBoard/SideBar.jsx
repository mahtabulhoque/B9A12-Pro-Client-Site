
import { FaCreativeCommons,FaHome } from "react-icons/fa";
import { NavLink} from "react-router-dom";
import useRole from "../../Hooks/useRole";
import SurveyorMenu from "./Menu/SurveyorMenu";
import UserMenu from "./Menu/UserMenu";
import AdminMenu from "./Menu/AdminMenu";
import ProUserMenu from "./Menu/ProUserMenu";

const SideBar = () => {
    const [role, isLoading] = useRole();
    console.log(role, isLoading);
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
            {/* Admin Menu */}
            {role === 'admin' && <AdminMenu></AdminMenu>}

            {/* Surveyor Menu */}
             {role === 'surveyor' && <SurveyorMenu></SurveyorMenu>}
            
            {/* user Menu */}
            {role === 'user' && <UserMenu></UserMenu>}
             {/* pro user */}
            {role === 'pro-user' && <ProUserMenu></ProUserMenu>}
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
