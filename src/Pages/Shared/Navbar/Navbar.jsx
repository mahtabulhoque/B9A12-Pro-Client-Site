import { Link } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProvider";
import { useContext } from "react";

const Navbar = () => {
  const { user, logOut} = useContext(AuthContext);

  const handleLogOut = () =>{
    logOut()
     .then(() => {})
     .catch(error => console.log(error));

  }

  const navOption = (
    <>
      <li>
        <Link to="/" className="text-lg lg:text-2xl lg:font-medium">
          Home
        </Link>
      </li>
      <li>
        <Link to="/surveys" className="text-lg lg:text-2xl lg:font-medium">
          Surveys
        </Link>
      </li>
      <li>
        <Link
          to="/survey-details"
          className="text-lg lg:text-2xl lg:font-medium"
        >
          Survey Details
        </Link>
      </li>
      <li>
        <Link to="/price" className="text-lg lg:text-2xl lg:font-medium">
          Price
        </Link>
      </li>
      <li>
        <Link to="/dashboard" className="text-lg lg:text-2xl lg:font-medium">
          Dashboard
        </Link>
      </li>
      <li>
        <Link to="/register" className="text-lg lg:text-2xl lg:font-medium">
          Register Here
        </Link>
      </li>
    </>
  );

  return (
    <>
      <div className="navbar fixed z-10 bg-opacity-75 bg-base-200 max-w-[1440px]">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navOption}
            </ul>
          </div>
          <a className="text-sky-600 lg:text-5xl font-bold">Pro Survey</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navOption}</ul>
        </div>

        {user ? (
          <>
          <span>{user?.displayName}</span>
          <button onClick={handleLogOut} className="btn btn-active btn-ghost">Log Out</button></>
        ) : (
          <>
            <div className="navbar-end">
              <Link to="login">
                <a className="btn text-white bg-slate-500">LogIn</a>
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;
