import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import {setUserDetails} from '../../redux/reducerSlices/userSlice'
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
const SignupSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .min(6, "Too Short!")
    .max(15, "Too Long!")
    .required("Required"),

  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  const handleLogin = async (values) => {
    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const result = await response.json();
      dispatch(setUserDetails(result));
      console.log(result);
      router.push("/");
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

<<<<<<< HEAD
  return (
    <div className="flex w-5/6  justify-center  m-auto mt-4">
      <div className="flex flex-col w-full sm:w-3/4 md:w-2/4  lg:w-2/4 xl:w-96  justify-center ">
        <h1 className=" text-lg mt-4 w-full text-center md:text-2xl font-semibold">
          Login
        </h1>
        <Formik
          initialValues={{
            phoneNumber: "",
            password: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={(values) => {
            // same shape as initial values
            handleLogin(values);
          }}
        >
          {({ errors, touched }) => (
            <Form className="w-full flex flex-col justify-center mx-auto mt-10">
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium leading-6 text-gray-900 mt-5"
              >
                Phone Number
              </label>
              <Field
                className="block mt-2  w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-400 sm:text-sm sm:leading-6 outline-none"
                name="phoneNumber"
              />
              {errors.phoneNumber && touched.phoneNumber ? (
                <div className="text-red-500">{errors.phoneNumber}</div>
              ) : null}
=======
	return (
		<div className="flex w-5/6  justify-center  m-auto mt-4">
			
			<div className="flex flex-col w-full sm:w-3/4 md:w-2/4  lg:w-2/4 xl:w-96  justify-center ">
				<center>
					<Image src={'/slogo.jpg'} width={150} height={150} alt="logo/"></Image> 
        		</center>
				<h1 className=" text-lg mt-4 w-full text-center md:text-2xl font-semibold">
					Login
				</h1>
				<Formik
					initialValues={{
						phoneNumber: "",
						password: "",
					}}
					validationSchema={SignupSchema}
					onSubmit={(values) => {
						// same shape as initial values
						handleLogin(values);
					}}
				>
					{({ errors, touched }) => (
						<Form className="w-full flex flex-col justify-center mx-auto mt-10">
							<label
								htmlFor="phoneNumber"
								className="block text-sm font-medium leading-6 text-gray-900 mt-5"
							>
								Phone Number
							</label>
							<Field
								className="block mt-2  w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-400 sm:text-sm sm:leading-6 outline-none"
								name="phoneNumber"
							/>
							{errors.phoneNumber && touched.phoneNumber ? (
								<div className="text-red-500">{errors.phoneNumber}</div>
							) : null}
>>>>>>> 4d60844d6b52f3ee4f8b19e660cb4c2745cba3f3

              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900 mt-5"
              >
                New Password
              </label>
              <Field
                name="password"
                type="password"
                className="block mt-2 w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-400 sm:text-sm sm:leading-6 outline-none"
              />
              {errors.password && touched.password ? (
                <div className="text-red-500">{errors.password}</div>
              ) : null}

              <button
                type="submit"
                className="flex mt-6 w-full justify-center rounded-xl bg-indigo-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 active:bg-indigo-800"
              >
                Log In
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
