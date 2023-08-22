import React, { Fragment, useEffect, useRef, useState } from "react";
import { EditLocation } from "@mui/icons-material";
import { Button, Modal } from "@mui/material";
import { Formik, Form, Field } from "formik";
import CustomModal from "../../components/Modal";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import Image from "next/image";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";
import { updateUserDetails } from "@/redux/reducerSlices/userSlice";

const label = { inputProps: { "aria-label": "Switch demo" } };

const VehicleForm = (props) => {
  const { userDetails } = useSelector((state) => state.user);
  const [file, setFile] = useState(null);
  const handleAddVehicle = async (values) => {
    var formData = new FormData();
    Object.entries(values).map((item) => {
      formData.append(item[0], item[1]);
    });
    formData.append("vehicleImage", file);
    formData.append("user", userDetails._id);

    const response = await fetch("http://localhost:8000/vehicles", {
      method: "POST",
      body: formData,
    });
    const result = await response.json();
    if (response.status === 200) {
      props.setOpen(false);
      props.fetchVehicleDetails();
    }
  };
  return (
    <div>
      <Formik
        initialValues={{
          vehicleNumber: "",
          vehicleCategory: "",
        }}
        onSubmit={(values) => {
          // same shape as initial values
          handleAddVehicle(values);
        }}
      >
        {({ errors, touched }) => (
          <Form className="w-full flex flex-col justify-center mx-auto mt-10">
            <label
              htmlFor="Vehicle Number"
              className="block text-sm font-medium leading-6 text-gray-900 mt-5"
            >
              Vehicle Number
            </label>
            <Field
              className="block mt-2  w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-400 sm:text-sm sm:leading-6 outline-none"
              placeholder="************"
              name="vehicleNumber"
            />
            {errors.vehicleNumber && touched.vehicleNumber ? (
              <div className="text-red-500">{errors.vehicleNumber}</div>
            ) : null}

            <label
              htmlFor="vehicleCategory"
              className="block text-sm font-medium leading-6 text-gray-900 mt-5"
            >
              Vehicle Category
            </label>
            <Field
              placeholder="************"
              name="vehicleCategory"
              className="block mt-2 w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-400 sm:text-sm sm:leading-6 outline-none"
            />
            {errors.vehicleCategory && touched.vehicleCategory ? (
              <div className="text-red-500">{errors.vehicleCategory}</div>
            ) : null}
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <button
              type="submit"
              className="flex mt-6 w-full justify-center rounded-xl bg-indigo-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 active:bg-indigo-800"
            >
              Save
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

// Change password form
const ChangePasswordForm = () => {
  // To show and hide form
  const [isOpen, setIsOpen] = useState(false);

  const handleFormOpen = () => {
    setIsOpen((currState) => !currState);
  };

  // For getting and setting form height -> For animation while form showing and hiding
  const formRef = useRef(null);
  return (
    <Fragment>
      <div className="flex items-center gap-6 mt-2 border-t-2 py-2 max-w-xl">
        <h1 className="text-lg font-semibold uppercase max-w-xl">
          Change your password
        </h1>
        <svg
          className={`w-4 h-4 dark:text-black font-bold inline-block text-3xl hover:cursor-pointer ${
            isOpen ? "" : "rotate-180"
          } transition-transform duration-500 ease-in`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 8"
          onClick={handleFormOpen}
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1"
          />
        </svg>
      </div>
      <Formik
        initialValues={{
          passwordCurrent: "",
          password: "",
          passwordConfirm: "",
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ errors, touched }) => (
          <div
            ref={formRef}
            style={{
              maxHeight: `${
                isOpen ? `${formRef.current.scrollHeight}px` : "0px"
              }`,
            }}
            className="overflow-hidden transition-all duration-700 ease-in-out"
          >
            <Form className="flex max-w-xl flex-col p-2 justify-center">
              <label
                htmlFor="passwordCurrent"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Current Password
              </label>
              <Field
                className="block mt-2  w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-400 sm:text-sm sm:leading-6 outline-none"
                placeholder="************"
                name="passwordCurrent"
              />
              {errors.passwordCurrent && touched.passwordCurrent ? (
                <div className="text-red-500 text-sm">
                  {errors.passwordCurrent}
                </div>
              ) : null}
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900 mt-2"
              >
                Password
              </label>
              <Field
                className="block mt-2  w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-400 sm:text-sm sm:leading-6 outline-none"
                placeholder="************"
                name="password"
              />
              {errors.password && touched.password ? (
                <div className="text-red-500 text-sm">{errors.password}</div>
              ) : null}
              <label
                htmlFor="passwordConfirm"
                className="block text-sm font-medium leading-6 text-gray-900 mt-2"
              >
                passwordConfirm
              </label>
              <Field
                className="block mt-2  w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-400 sm:text-sm sm:leading-6 outline-none"
                name="password"
                placeholder="************"
              />
              {errors.passwordConfirm && touched.passwordConfirm ? (
                <div className="text-red-500 text-sm">
                  {errors.passwordConfirm}
                </div>
              ) : null}

              <button
                type="submit"
                className="flex mt-6 w-full justify-center rounded-xl bg-indigo-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 active:bg-indigo-800"
              >
                Change Password
              </button>
            </Form>
          </div>
        )}
      </Formik>
    </Fragment>
  );
};

const index = () => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = React.useState(false);

  // dispatcher
  const dispatch = useDispatch();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [editOpen, setEditOpen] = useState(false);

  const [vehicleDetails, setVechicleDetails] = useState({});

  // Getting userDetails from the store
  const { userDetails } = useSelector((state) => state.user);

  // Getting a user role from the store
  const role = userDetails.role;

  // A function to change the user role -> sends a patch request to the api for changing the role
  const changeUserRole = async (changedRole) => {
    const response = await fetch(
      `http://localhost:8000/switchUser/${userDetails._id}`,
      {
        method: "PATCH",
        body: JSON.stringify({ role: changedRole }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await response.json();
    if (result.success) {
      // If result is success, update the userDetails in the store -> role should be updated in the store too.
      dispatch(updateUserDetails(result));
    } else {
      console.log("Something went wrong!");
    }
  };

  const handleChange = (e) => {
    changeUserRole(e.target.checked ? "rider" : "passenger");
  };

  const fetchVehicleDetails = async () => {
    const response = await fetch(
      " http://localhost:8000/vehicles/" + userDetails._id
    );
    const result = await response.json();
    setVechicleDetails(result.data);
  };

  useEffect(() => {
    fetchVehicleDetails();
  }, []);
  return (
    <div className="p-4">
      <CustomModal editOpen={editOpen} setEditOpen={setEditOpen} />
      <strong>User Details</strong>
      <div style={{ border: "1px solid", padding: "10px" }}>
        <Button variant="outlined" onClick={() => setEditOpen(true)}>
          Edit
        </Button>
        <p>{userDetails.fullName}</p>
        <p>{userDetails.role}</p>
        <p>{userDetails.phoneNumber}</p>

        <ChangePasswordForm />
      </div>
      <strong>Rider mode</strong>
      {/* Should be checked in the user role is rider else it shouldn't be checked */}
      <Switch checked={role === "rider"} onChange={handleChange} {...label} />
      {role === "rider" && (
        <div>
          {vehicleDetails ? (
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  1
                </Typography>
                <Typography variant="h5" component="div">
                  <strong>Vehcile Number:</strong>{" "}
                  {vehicleDetails?.vehicleNumber}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  <strong>Vehcile Category:</strong>{" "}
                  {vehicleDetails?.vehicleCategory}
                </Typography>
                <Image
                  width={100}
                  height={100}
                  src={"http://localhost:8000/products/" + userDetails?._id}
                  alt="Live from space album cover"
                />
              </CardContent>
            </Card>
          ) : (
            <Button onClick={handleOpen}>Add Vehicle</Button>
          )}

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <VehicleForm
                setOpen={setOpen}
                fetchVehicleDetails={fetchVehicleDetails}
              />
            </Box>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default index;
