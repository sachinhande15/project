"use client";
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik } from "formik";
import * as Yup from "yup";

export default function SearchBar() {
  const [result, setResult] = useState({});

  const initialValues = {
    vehicleNumber: "",
  };
  const onSubmit = async (values, { resetForm }) => {
    let vehicleNumber = JSON.stringify(values);
    const res = await axios.post("/api/users/searchVehicle", vehicleNumber, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status == 200) {
      const data = await res.data;
      toast.success("success", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setResult(data);
    } else {
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    console.log(result);
    resetForm();
  };
  const validation = Yup.object().shape({
    vehicleNumber: Yup.string()
      .min(10, "Please provide correct number e.g AB-12 CD 1234 ")
      .max(10, "Too long")
      .required("Please enter a vehicle number"),
  });

  // const searchVehicle = async (e, values) => {
  //   try {
  //     e.preventDefault();
  //     let vehicleNumber = JSON.stringify(values);
  //     if (!vehicleNumber) {
  //       toast.error("please enter vehicle number", {
  //         position: toast.POSITION.BOTTOM_RIGHT,
  //       });
  //       return;
  //     }
  //     const res = await axios.post("/api/users/searchVehicle", vehicleNumber, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     if (res.status == 200) {
  //       const data = await res.data;
  //       console.log(data);
  //       toast.success("details found", {
  //         position: toast.POSITION.TOP_RIGHT,
  //       });
  //       setResult(data);
  //     } else {
  //       toast.error("something went wrong", {
  //         position: toast.POSITION.TOP_RIGHT,
  //       });
  //       return;
  //     }
  //   } catch (error) {
  //     toast.error(error, {
  //       position: toast.POSITION.TOP_RIGHT,
  //     });
  //   }
  //   console.log(result);
  // };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validation}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          handleBlur,
          handleSubmit,
          handleChange,
        } = props;
        return (
          <div className="flex flex-col justify-start md:justify-center items-center w-screen bg-gradient-to-r  h-screen p-2 m-2">
            <form
              onSubmit={handleSubmit}
              className="bg-white  m-4 md:w-1/2 flex items-center border rounded-[60px] pt-[10px] pb-[10px] pl-[20px] pr-[20px]"
            >
              <input
                type="text"
                name="vehicleNumber"
                id="vehicleNumber"
                value={values.vehicleNumber}
                onBlur={handleBlur}
                autoComplete="off"
                onChange={handleChange}
                className="bg-transparent  text-xl flex-1 border-[0] outline-none md:pt-1 md:pb-1 md:pl-2 md:pr-2 md:text-3xl font-sans font-medium place-content-center placeholder-gray-500"
                placeholder="enter vehicle number e.g. MH20FJ1234"
              />

              <button
                type="submit"
                className="font-sans text-2xl md:text-3xl border outline-none bg-neutral-50 rounded-3xl tracking-wide md:p-2 ml-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="25"
                  height="25"
                  className="p-1"
                >
                  <path
                    d="M11 2C15.968 2 20 6.032 20 11C20 15.968 15.968 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2ZM11 18C14.8675 18 18 14.8675 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18ZM19.4853 18.0711L22.3137 20.8995L20.8995 22.3137L18.0711 19.4853L19.4853 18.0711Z"
                    fill="rgba(43,56,69,1)"
                  ></path>
                </svg>
              </button>
            </form>
            {errors.vehicleNumber && touched.vehicleNumber ? (
              <span className="text-red-600 capitalize font-normal font-sans">
                {errors.vehicleNumber}
              </span>
            ) : null}
            {result?.name ? (
              <div className="p-5 flex flex-col mt-20 w-[300px]">
                <h1 className="text-start font-sans text-3xl ">
                  {result?.name}
                </h1>
                <span className="mt-1 text-lg font-sans font-medium">
                  {result?.vehicleNumber}
                </span>
                <button className="mt-3 border rounded-lg p-2 text-lg font-sans font-bold bg-green-400">
                  Send Message{" "}
                </button>
              </div>
            ) : (
              ""
            )}

            <ToastContainer></ToastContainer>
          </div>
        );
      }}
    </Formik>
  );
}
