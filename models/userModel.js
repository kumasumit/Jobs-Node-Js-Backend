import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
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
      minlength: [6, "Minimum password length is 6 characters"],
    },
    location: {
      type: String,
      default: "India",
    },
  },
  {
    timestamps: true,
  }
);
// Middleware to encrypt password before saving to database
userSchema.pre("save", async function (next) {
  // We dont use arrow function here because we need to use this keyword
  if (!this.isModified("password")) {
    // We encrypt the password only if it is modified, if it is not modified, pass the call to the next function in the execution list
    // Ask raul about this
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
const User = mongoose.model("users", userSchema); // users is the collection name in MongoDB.
export default User;
