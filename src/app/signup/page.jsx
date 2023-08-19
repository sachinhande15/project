"use client";
import React from "react";
import Link from "next/link";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useRouter } from "next/navigation";
export default function Form() {
  const router = useRouter();
  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  /*
   * User registration
   */
  const onSubmit = async (values, { resetForm }) => {
    try {
      const userData = JSON.stringify(values);
      let response = await axios.post("/api/user/registration", userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      let data = await response.data;
      console.log(data);
      if (!data.success) {
        toast.error(data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        return;
      }
      toast.success(data.message, {
        position: toast.POSITION.TOP_CENTER,
      });
      setInterval(() => {
        router.push("/login");
      }, 5000);
      resetForm();
    } catch (error) {
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  /*
   * Validate all fields
   */
  const validate = (values) => {
    let errors = {};
    if (!values.name) {
      errors.name = "This Field is required";
    } else if (!values.email) {
      errors.email = "This field is required";
    } else if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        values.email
      )
    ) {
      errors.email = "Email address is not valid";
    } else if (!values.password) {
      errors.password = "This Field is required";
    }
    return errors;
  };
  const { handleChange, handleSubmit, values, errors, handleBlur, touched } =
    useFormik({
      initialValues,
      onSubmit,
      validate,
    });

  return (
    <>
      <section>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen md:h-screen lg:py-0 ">
          <div className="w-full md:mt-0 sm:max-w-md xl:p-0 bg-green-20">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-center md:text-2xl ">
                Sign up
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-black tracking-wide font-sans"
                  >
                    Name
                  </label>
                  <input
                    type="name"
                    name="name"
                    id="name"
                    onChange={handleChange}
                    value={values.name}
                    onBlur={handleBlur}
                    className="border border-red-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:placeholder-gray-400 dark:text-black dark:focus:ring-red-500 dark:focus:border-red-500"
                    placeholder="Enter your name"
                    required=""
                    autoComplete="off"
                  />
                  {errors.name && touched.name ? (
                    <span className="text-red-500 font-normal font-sans">
                      {errors.name}
                    </span>
                  ) : null}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-black tracking-wide font-sans"
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={handleChange}
                    value={values.email}
                    onBlur={handleBlur}
                    className="border border-red-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:placeholder-gray-400 dark:text-black dark:focus:ring-red-500 dark:focus:border-red-500"
                    placeholder="name@company.com"
                    required=""
                    autoComplete="off"
                  />
                  {errors.email && touched.email ? (
                    <span className="text-red-500 font-normal font-sans">
                      {errors.email}
                    </span>
                  ) : null}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-black tracking-wide font-sans"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={handleChange}
                    value={values.password}
                    onBlur={handleBlur}
                    placeholder="••••••••"
                    className="border border-red-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:placeholder-gray-400 text-black dark:focus:ring-red-500 dark:focus:border-red-500"
                    required=""
                  />
                  {errors.password && touched.password ? (
                    <span className="font-normal text-red-500 font-sans mt-1">
                      {errors.password}
                    </span>
                  ) : null}
                </div>

                <button
                  type="submit"
                  className="w-full font-bold tracking-normal text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  Sign In
                </button>
                <p className="text-sm font-light">
                  Already have an account?{" "}
                  <Link
                    href={"/login"}
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign In
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer></ToastContainer>
    </>
  );
}
