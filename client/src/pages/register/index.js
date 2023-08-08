import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
	fullName: Yup.string()
		.min(2, "Too Short!")
		.max(50, "Too Long!")
		.required("Required"),
	phoneNumber: Yup.string()
		.min(6, "Too Short!")
		.max(15, "Too Long!")
		.required("Required"),

	password: Yup.string()
		.min(6, "Too Short!")
		.max(50, "Too Long!")
		.required("Required"),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref("password"), null], "Passwords do not match")
		.required("Required"),
});

export default function Register() {
	const registerUser = async (values) => {
		try {
			const response = await fetch("http://localhost:3005/user/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(values),
			});
			const result = await response.json();
			console.log("Post response:", result);
		} catch (error) {
			console.error("Error posting data:", error);
		}
	};

	return (
		<div className="flex w-5/6  justify-center  m-auto mt-4">
			<div className="flex flex-col w-full sm:w-3/4 md:w-2/4  lg:w-2/4 xl:w-96  justify-center ">
				<h1 className=" text-lg mt-4 w-full text-center md:text-2xl">
					Create your account now
				</h1>
				<Formik
					initialValues={{
						fullName: "",
						phoneNumber: "",

						password: "",
					}}
					validationSchema={SignupSchema}
					onSubmit={(values) => {
						// same shape as initial values
						registerUser(values);
					}}
				>
					{({ errors, touched }) => (
						<Form className="w-full flex flex-col justify-center mx-auto mt-10">
							<label
								htmlFor="fullName"
								className="block text-sm font-medium leading-6 text-gray-900 mt-5"
							>
								Full Name
							</label>
							<Field
								className="block mt-2  w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-400 sm:text-sm sm:leading-6 outline-none"
								name="fullName"
							/>
							{errors.fullName && touched.fullName ? (
								<div className="text-red-500">{errors.fullName}</div>
							) : null}
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

							<label
								htmlFor="password"
								className="block text-sm font-medium leading-6 text-gray-900 mt-5"
							>
								Password
							</label>
							<Field
								name="password"
								type="password"
								className="block mt-2 w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-400 sm:text-sm sm:leading-6 outline-none"
							/>
							{errors.password && touched.password ? (
								<div className="text-red-500">{errors.password}</div>
							) : null}
							<label
								htmlFor="confirmPassword"
								className="block text-sm font-medium leading-6 text-gray-900 mt-5"
							>
								Confirm Password
							</label>
							<Field
								name="confirmPassword"
								type="password"
								className="block mt-2 w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-400 sm:text-sm sm:leading-6 outline-none"
							/>
							{errors.confirmPassword && touched.confirmPassword ? (
								<div className="text-red-500">{errors.confirmPassword}</div>
							) : null}

							<button
								type="submit"
								className="flex mt-3 w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 active:bg-indigo-800"
							>
								Sign Up
							</button>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
}
