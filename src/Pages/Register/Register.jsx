import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import registrationImage from "../../../public/registration.jpg"; // Adjust the import path based on your project structure
import { Helmet } from "react-helmet-async";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";

const Register = () => {
  const axiosPublic = UseAxiosPublic();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { createUser, update } = useContext(AuthContext);
  const navigate = useNavigate();

  const validatePassword = (value) => {
    return value.length >= 8 && /[A-Z]/.test(value) && /[0-9]/.test(value);
  };

  const onSubmit = (data) => {
    // Perform password validation
    if (!validatePassword(data.password)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Password",
        text: "Password must be at least 8 characters long and include at least one uppercase letter and one number.",
      });
      return;
    }

    // Register the user
    createUser(data.email, data.password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        // Update user profile
        update(data.name)
          .then(() => {
            const userInfo = {
              name: data.name,
              email: data.email,
            };
            axiosPublic.post("/users", userInfo).then((res) => {
              if (res.data.insertedId) {
                reset();
                // Show success message with SweetAlert
                Swal.fire({
                  icon: "success",
                  title: "Registration Successful",
                  text: "You have successfully registered!",
                });
                navigate("/");
              }
            });
          })
          .catch((error) => {
            // Show error message with SweetAlert
            Swal.fire({
              icon: "error",
              title: "Profile Update Error",
              text: error.message, // You can customize this message based on your error handling
            });
          });
      })
      .catch((error) => {
        // Show error message with SweetAlert
        Swal.fire({
          icon: "error",
          title: "Registration Error",
          text: error.message, // You can customize this message based on your error handling
        });
      });
  };

  return (
    <>
      <Helmet>
        <title>Pro Survey | Register</title>
      </Helmet>

      <div className="hero min-h-screen bg-gray-100">
        <div className="hero-content flex flex-col lg:flex-row items-center lg:items-start">
          <motion.div
            className="mb-6 lg:mb-0 lg:mr-8"
            initial={{ x: "100vw" }}
            animate={{ x: 0 }}
            transition={{ type: "spring", stiffness: 40 }}
          >
            <img
              src={registrationImage}
              alt="Registration"
              className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
            />
          </motion.div>
          <motion.div
            className="card shrink-0 w-full max-w-sm shadow-2xl bg-white"
            initial={{ x: "-100vw" }}
            animate={{ x: 0 }}
            transition={{ type: "spring", stiffness: 50 }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="card-body p-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  placeholder="Enter your name"
                  className="input input-bordered"
                  required
                />
                {errors.name && (
                  <span className="text-red-800">Name is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="Enter your email"
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
                  {...register("password", { required: true })}
                  placeholder="Enter your password"
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <input
                  className="btn btn-primary"
                  type="submit"
                  value="Register"
                />
              </div>
            </form>
            <p className="text-center p-4">
              <small>
                Already have an account?{" "}
                <Link className="text-blue-600" to="/login">
                  LogIn
                </Link>
              </small>
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Register;
