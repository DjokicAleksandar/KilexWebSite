const sendEmailRoute = require("./routes/SendEmail.js");
const addSaleRoute = require("./routes/AddSale.js");
const loginRoute = require("./routes/Login.js");
const formRoute = require("./routes/Form.js");

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser")
const mongoose = require("mongoose");

const PORT = process.env.PORT || 5000;

require("dotenv").config();

const corsOptions = {
  origin: "https://kilexwebsite.onrender.com", // frontend
  credentials: true,
};

//Middleware
const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json({limit: "10mb"}));
app.use(bodyParser.urlencoded({extended: true}));

//DB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Connected to mongodb"))
.catch(err => console.error("Error, ", err));

app.get('/api/', (req, res) => {
  res.json({ message: "Radi!" });
});

app.use(sendEmailRoute);
app.use(addSaleRoute);

//login
app.use(loginRoute);

app.use(formRoute);

app.listen(PORT, () => {
  console.log('Server radi na: ' + PORT);
});