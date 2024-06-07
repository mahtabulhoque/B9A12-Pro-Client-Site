import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import registrationImage from "../../../public/registration.jpg"; // Adjust the import path based on your project structure
import { Helmet } from "react-helmet-async";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { Link } from "react-router-dom";

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const {createUser}=useContext(AuthContext)

  const validatePassword = (value) => {
    return (
      value.length >= 8 &&
      /[A-Z]/.test(value) &&
      /[0-9]/.test(value)
    );
  };

  const onSubmit = (data) => {

    console.log(data);
    createUser(data.email, data.password)
    .then(result =>{
        const looggedUser = result.user;
        console.log(looggedUser);
    })


    // Perform password validation
    if (!validatePassword(data.password)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Password',
        text: 'Password must be at least 8 characters long and include at least one uppercase letter and one number.',
      });
      return;
    }

    // Perform registration logic here (simulated with console.log)
    console.log(data);

    // Reset the form after successful registration
    reset();

    // Show success message with SweetAlert
    Swal.fire({
      icon: 'success',
      title: 'Registration Successful',
      text: 'You have successfully registered!',
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
              {errors.name && <span className="text-red-800">Name is required</span>}
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

                <input  className="btn btn-primary" type="submit" value='Register' />
             
            </div>
          </form>
          <p className="text-center p-4"><small>Already have an account? <Link className="text-blue-600" to="/login">LogIn</Link></small></p>
        </motion.div>
      </div>
    </div>
    
    </>
  );
};

export default Register;
