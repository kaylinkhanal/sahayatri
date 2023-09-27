const express = require("express");

const UsersRoutes = require("./routes/users");
const VehiclesRoutes = require("./routes/vehicles");
const RidesRoutes = require("./routes/rides");

const Rides = require("./models/rides")
const cors = require("cors");
const connectDb = require("./db/connection");
const app = express();
require("dotenv").config();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
	cors: {
	  origin: "*"
	}
  });


app.use(cors());
app.use(express.json());
app.use(UsersRoutes);
app.use(VehiclesRoutes);
app.use(RidesRoutes);

connectDb();
const port = process.env.PORT;

io.on('connection', async(socket) => {
	socket.on('rideRequests', async(rideRequests) => {
		await Rides.create(rideRequests)
		//
		const data = await Rides.find({status:'pending'}).populate('user')
		console.log(data)
		io.emit('rideRequests', data)
	  });

	  socket.on('acceptanceDetails', async(acceptanceDetails) => {
		io.emit('acceptanceDetails', acceptanceDetails)
	  });


	  socket.on('riderLocationInfo', async(riderLocationInfo) => {
		io.emit('riderLocationInfo', riderLocationInfo)
	  });



  });
  
server.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
