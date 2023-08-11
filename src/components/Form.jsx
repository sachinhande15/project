"use client";
import { useState } from "react";
import Link from "next/link";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Spinner from "./Spinner";
export default function Form() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = async (values) => {
    setLoading(true);
    const { email, password } = values;
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      setLoading(false);
      if (res.error) {
        toast.error(res.error, toast.POSITION.TOP_RIGHT);
        return;
      }
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };
  // const onSubmit = async (values) => {
  //   try {
  //     const userData = JSON.stringify(values);
  //     let response = await axios.post("/api/user/verify", userData, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     let data = await response.data;
  //     if (data.success) {
  //       toast.success(data.message, {
  //         position: toast.POSITION.TOP_CENTER,
  //       });
  //       router.push("/dashboard");
  //     } else {
  //       toast.error(data.message, {
  //         position: toast.POSITION.TOP_CENTER,
  //       });
  //       initialValues;
  //     }
  //   } catch (error) {
  //     toast.error(error, {
  //       position: toast.POSITION.BOTTOM_RIGHT,
  //     });
  //   }
  // };
  const validate = (values) => {
    let errors = {};
    if (!values.email) {
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
          <h1
            href="#"
            className="flex items-center mb-6 text-2xl font-bold text-amber-400"
          >
            Welcome Back
          </h1>
          <div className="w-full md:mt-0 sm:max-w-md xl:p-0 bg-green-20">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl ">
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Email Address
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
                    <span className="text-white font-semibold bg-red-500  font-sans">
                      {errors.email}
                    </span>
                  ) : null}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium "
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
                    <span className="font-semibold bg-red-500 font-sans mt-1">
                      {errors.password}
                    </span>
                  ) : null}
                </div>
                <div className="flex justify-end">
                  <Link
                    href="#"
                    className="text-sm font-medium text-black hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <button
                  type="submit"
                  className=" flex justify-center place-items-end w-full text-white bg-sky-600 hover:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800"
                >
                  <div className="">
                    {loading ? (
                      <>
                        <Spinner></Spinner>
                      </>
                    ) : (
                      <span className="text-center font-medium text-xl">
                        {" "}
                        Sign in
                      </span>
                    )}
                  </div>
                </button>
                <p className="text-sm font-light">
                  Don’t have an account yet?{" "}
                  <Link
                    href={"/signup"}
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign up
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
