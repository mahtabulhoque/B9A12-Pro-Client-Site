import { useContext, useEffect, useState } from "react";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { AuthContext } from "../../Providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import {  FaGoogle } from "react-icons/fa";
import { FaLongArrowAltLeft } from "react-icons/fa";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";

const LogIn = () => {
  const axiosPublic = UseAxiosPublic();
  const [disable, setDisable] = useState(true);
  const { logIn, signInWithGoogle,user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (user) {
      navigate('/');
    }
    loadCaptchaEnginge(6);
  }, [navigate, user]);

  const handleLogin = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const result = await logIn(email, password);
      const user = result.user;
      console.log(user);
      Swal.fire({
        icon: "success",
        title: "Logged in successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate(from, { replace: true });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Error",
        text: error.message,
      });
    }
  };

  const handleValidateCaptcha = (e) => {
    const user_captcha_value = e.target.value;
    if (validateCaptcha(user_captcha_value)) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  };

  const handleGoogleLogIn = async () => {
    try {
      const result = await signInWithGoogle();
      const userInfo = {
        email: result.user?.email,
        name: result.user?.displayName,
      };
      const res = await axiosPublic.put("/user", userInfo);
      console.log("Server response:", res.data);
      navigate(from, { replace: true });
      Swal.fire({
        icon: "success",
        title: "Google Login Successful",
        text: "You have successfully logged in with Google!",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Google Login Error",
        text: error.message,
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Pro Survey | Login</title>
      </Helmet>

      <div
        className="hero min-h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('login2.jpg')" }}
      >
        
        <div className="hero-content flex-col">
          <div className="text-center lg:text-left">
          <div className=" mb-10">
          
            <Link to="/">
           <button className="btn btn-wide bg-green-300"><FaLongArrowAltLeft /></button> 
            </Link>
          </div>
            <h1 className="text-5xl font-bold text-blue-500">Login now!</h1>
          </div>
          <div className="card  w-full max-w-sm shadow-2xl bg-gray-400">
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                <Link to="#" className="label-text-alt link link-hover">
                  Forgot password?
                </Link>
              </div>
              <div className="form-control">
                <label className="label">
                  <LoadCanvasTemplate />
                </label>
                <input
                  onBlur={handleValidateCaptcha}
                  type="text"
                  name="captcha"
                  placeholder="type the captcha"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control mt-6">
                <input
                  disabled={disable}
                  className="btn btn-primary"
                  type="submit"
                  value="Login"
                />
              </div>
            </form>
            <p className="text-center p-4">
              <small>
                Create New Account?{" "}
                <Link className="text-blue-600" to="/register">
                  Register
                </Link>
              </small>
            </p>
            <div>
              <button
                onClick={handleGoogleLogIn}
                className="btn btn-google m-4 btn-primary"
              >
                <FaGoogle className="mr-2" /> Sign in with Google
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default LogIn;
