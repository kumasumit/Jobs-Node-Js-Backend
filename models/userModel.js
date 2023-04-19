import mongoose from "mongoose";
import validator from "validator";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        validate: [validator.isEmail, "Please enter a valid email"],
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
    },
    location:{
        type: String,
        default: "India",
    }
},
{
    timestamps: true,
}
);

const User = mongoose.model("users", userSchema); // users is the collection name in MongoDB.
export default User;