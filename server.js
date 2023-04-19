// package imports
import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import morgan from "morgan";

// file imports - local imports
import connectDB from "./config/db.js";

// Routes imports
import authRouter from "./routes/authRouter.js";



// Initialize the express server
const app = express();

// Middlewares
app.use(express.json()); // this tells that in this app we are going to use json data
app.use(cors()); // this tells that in this app we are going to use cors
app.use(morgan('dev')); // this tells that in this app we are going to use morgan to log all the req and responses

// Routes
app.use('/api/v1/auth', authRouter);

// env configuration
dotenv.config(); // if .env file is not present in root folder, we can use path inside config to set the path variable.

// mongoDB connection
connectDB();

// routes
app.get('/', (req, res) => {
    res.send('<h1>Welcome to the job portal</h1>');
});

// assigning port from env variable
const PORT = process.env.PORT || 8080;

// listen on port 8080
app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.DEV_MODE} on port ${PORT}`.bgCyan.white);
    // Here bgCyan is background color and white is text color
});