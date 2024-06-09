import { useContext, useEffect, useState } from "react";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { AuthContext } from "../../Providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
// Import SweetAlert2
import { FaGoogle } from "react-icons/fa";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";

const LogIn = () => {

  const axiosPublic = UseAxiosPublic();


  const [disable, setDisable] = useState(true);
  const { logIn, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    logIn(email, password).then((result) => {
      const user = result.user;
      console.log(user);
      Swal.fire({
        icon: "success",
        title: "Logged in successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate(from, { replace: true });
    });
  };

  const handleValidateCaptcha = (e) => {
    const user_captcha_value = e.target.value;
    if (validateCaptcha(user_captcha_value)) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  };

  const handleGoogleLogIn = () => {
    signInWithGoogle()
      .then(result => {
        console.log(result.user);
        const userInfo = {
          email: result.user?.email,
          name: result.user?.displayName
        };
        axiosPublic.post('/users', userInfo)
          .then(res => {
            console.log('Server response:', res.data);
          })
          .catch(error => {
            console.error('Error storing user info:', error);
          });
        navigate(from, { replace: true });
        Swal.fire({
          icon: "success",
          title: "Google Login Successful",
          text: "You have successfully logged in with Google!",
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Google Login Error",
          text: error.message,
        });
      });
  };
  

  return (
    <>
      <Helmet>
        <title>Pro Survey | Login</title>
      </Helmet>

      <div className="hero min-h-screen bg-cover bg-center relative overflow-hidden">
        {/* Background Image Animation */}
        <motion.div
          initial={{ opacity: 0, x: "-100vw" }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: 'url("login2.jpg")' }}
        />

        {/* Hero Overlay */}
        <div className="hero-overlay bg-opacity-60"></div>

        {/* Form Animation */}
        <motion.div
          initial={{ opacity: 0, x: "100vw" }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 30, delay: 0.5 }}
          className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center"
        >
          <div className="w-full max-w-sm shadow-2xl rounded-lg bg-base-200">
            <form onSubmit={handleLogin} className="card-body p-6 ">
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
                {/* <button
                  className="btn btn-outline btn-xs my-2"
                >
                  Validate
                </button> */}
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
            <div className="p-4">
              <small>
                New Here?{" "}
                <Link className="text-blue-600" to="/register">
                  Create an account
                </Link>
              </small>
            </div>
            <div className="">
              <button onClick={handleGoogleLogIn} className="btn btn-google m-4 btn-primary">
                <FaGoogle className="mr-2" /> Sign in with Google
              </button>
            </div>
          </div>
          <div className="text-center text-3xl text-white mt-4">
            <Link to="/">Back to Home</Link>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default LogIn;
