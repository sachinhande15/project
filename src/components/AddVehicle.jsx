"use client";
import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
export default function AddVehicle() {
  const initialValues = {
    vehicleNumber: "",
    company: "",
  };
  const onSubmit = async (values, { resetForm }) => {
    console.log(values);
    toast.success("detail added successfully");
    resetForm();
  };
  const validation = Yup.object().shape({
    vehicleNumber: Yup.string()
      .min(10, "Please provide correct number e.g AB-12 CD 1234 ")
      .max(10, "Too long")
      .required("Please enter a vehicle number"),
    company: Yup.string()
      .min(2, "Too short please provide correct company name")
      .max(30, "Too long")
      .required("Please provide a company name"),
  });
  return (
    <>
      <section>
        <div className="flex flex-col items-center h-screen px-6 mx-auto md:h-screen lg:py-0 ">
          <h1 className="m-6 text-2xl font-bold text-orange-600 ">
            Add Details
          </h1>
          <div className="w-full md:mt-0 sm:max-w-md xl:p-0 bg-transparent shadow-xl shadow-gray-800">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
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
                    dirty,
                    isSubmitting,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    handleReset,
                  } = props;
                  return (
                    <form
                      className="space-y-8 md:space-y-10 p-2"
                      onSubmit={handleSubmit}
                    >
                      <div>
                        <label
                          htmlFor="vehicleNumber"
                          className="block tracking-wide mb-2 text-sm font-bold text-gray-900"
                        >
                          Vehicle Number
                        </label>
                        <input
                          type="text"
                          name="vehicleNumber"
                          id="vehicleNumber"
                          onChange={handleChange}
                          value={values.vehicleNumber}
                          onBlur={handleBlur}
                          className="border border-red-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:placeholder-gray-400 dark:text-black dark:focus:ring-red-500 dark:focus:border-red-500"
                          placeholder="vehicle number"
                          required=""
                          autoComplete="off"
                        />
                        {errors.vehicleNumber && touched.vehicleNumber ? (
                          <span className="text-red-600 capitalize font-normal font-sans">
                            {errors.vehicleNumber}
                          </span>
                        ) : null}
                      </div>
                      <div>
                        <label
                          htmlFor="company"
                          className="block mb-2 text-sm font-bold tracking-wide "
                        >
                          Company Name
                        </label>
                        <input
                          type="text"
                          name="company"
                          id="company"
                          onChange={handleChange}
                          value={values.company}
                          onBlur={handleBlur}
                          autoComplete="off"
                          placeholder="company name"
                          className="border border-red-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:placeholder-gray-400 text-black dark:focus:ring-red-500 dark:focus:border-red-500"
                          required=""
                        />
                        {errors.company && touched.company ? (
                          <span className=" text-red-600 capitalize font-normal font-sans mt-2">
                            {errors.company}
                          </span>
                        ) : null}
                      </div>
                      <div className="flex flex-row justify-between">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="tracking-wider text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                        >
                          Submit
                        </button>
                        <button
                          onClick={handleReset}
                          disabled={!dirty || isSubmitting}
                          className="cursor-pointer tracking-wider text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                        >
                          Reset
                        </button>
                      </div>
                    </form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
