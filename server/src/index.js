const express = require("express");

const UsersRoutes = require("./routes/users");
const VehiclesRoutes = require("./routes/vehicles");

const cors = require("cors");
const connectDb = require("./db/connection");
const app = express();
require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use(UsersRoutes);
app.use(VehiclesRoutes);

connectDb();
const port = process.env.PORT;
app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
