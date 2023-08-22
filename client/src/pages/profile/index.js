import React,{useEffect, useState} from 'react'
import { EditLocation } from '@mui/icons-material'
import { Button , Modal} from '@mui/material'
import { Formik, Form, Field } from "formik";
import CustomModal from '../../components/Modal'
import { useSelector } from 'react-redux'
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import Image from 'next/image'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const VehicleForm = (props)=> {
  const {userDetails} = useSelector(state=>state.user)
  const [file,setFile] = useState(null)
  const handleAddVehicle = async(values) => {
    debugger;
    var formData = new FormData();
    Object.entries(values).map((item)=>{
      formData.append(item[0], item[1]);
    })
    formData.append('vehicleImage', file);
    formData.append('user', userDetails._id)

    const response = await fetch("http://localhost:8000/vehicles", {
      method: "POST",
      body: formData,
    });
    const result = await response.json();
    if(response.status===200){
      props.setOpen(false)
      props.fetchVehicleDetails()
    }
  }
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
								name="vehicleCategory"
								className="block mt-2 w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-400 sm:text-sm sm:leading-6 outline-none"
							/>
							{errors.vehicleCategory && touched.vehicleCategory ? (
								<div className="text-red-500">{errors.vehicleCategory}</div>
							) : null}
               <input type="file" onChange={(e)=> setFile(e.target.files[0])}/>
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
  )
}

const index=()=> {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
    const [editOpen, setEditOpen] = useState(false)
    const [isRider, setIsRider] = useState(false)
    const [vehicleDetails ,setVechicleDetails] = useState({})
    const {userDetails} = useSelector(state=>state.user)
    const handleChange= (e)=> {
      setIsRider(e.target.checked)
    }

    const fetchVehicleDetails = async() => {
      const response = await fetch(" http://localhost:8000/vehicles/"+userDetails._id);
			const result = await response.json();
      setVechicleDetails(result.data)
    }
    useEffect(()=>{
      fetchVehicleDetails()
    },[])
  return (
    <div>
        <CustomModal editOpen={editOpen} setEditOpen={setEditOpen}/>
        <strong>User Details</strong>
    <div style={{border: '1px solid'}}>
    <Button variant="outlined" onClick={()=> setEditOpen(true) } >
  Edit
</Button>
        <p>{userDetails.fullName}</p>
        <p>{userDetails.role}</p>
        <p>{userDetails.phoneNumber}</p>
    </div>
    <strong>Rider mode</strong><Switch onChange={handleChange} {...label} />
    {isRider  && (
        <div>
          { vehicleDetails ? (
   <Card sx={{ minWidth: 275 }}>
   <CardContent>
     <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
       1
     </Typography>
     <Typography variant="h5" component="div">
     <strong>Vehcile Number:</strong> {vehicleDetails?.vehicleNumber}
     </Typography>
     <Typography sx={{ mb: 1.5 }} color="text.secondary">
     <strong>Vehcile Category:</strong> {vehicleDetails?.vehicleCategory}
     </Typography>
     <Image
        width={100}
        height={100}
        src={'http://localhost:8000/products/'+userDetails._id}
        alt="Live from space album cover"
      />
   </CardContent>
 </Card>
          ) :  <Button onClick={handleOpen}>Add Vehicle</Button>}
       
      
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
       
   
      <Button>Change Password</Button>
    </div>
  )
}

export default index