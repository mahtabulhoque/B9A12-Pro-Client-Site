import { Outlet } from "react-router-dom";
import SideBar from "../../Components/DashBoard/SideBar";


const DashBoard = () => {
  return (
    <div className="flex">
      {/* sidebar */}
     <div className="flex-1">
     <SideBar></SideBar>
     </div>

      {/* outlet */}

      <div className="flex-1 p-3 bg-">
        <Outlet></Outlet>

      </div>
    </div>
  );
};

export default DashBoard;