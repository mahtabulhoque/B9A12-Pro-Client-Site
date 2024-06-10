import { NavLink } from "react-router-dom";
import { MdOutlinePublish } from "react-icons/md";
import { FcManager } from "react-icons/fc";
import { MdPayments } from "react-icons/md";


const AdminMenu = () => {
    return (
        <div>
           <li>
                <NavLink to="/dashboard/manage-users">
                <FcManager />
                    Manage Users</NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/surveys">
                
                <MdOutlinePublish />
                    Publish/unpublish</NavLink>
            </li> 
            <li>
                <NavLink to="/dashboard/surveys">
                
                  
                <MdPayments />
                    Payments & Responses</NavLink>
            </li> 
        </div>
    );
};

export default AdminMenu;