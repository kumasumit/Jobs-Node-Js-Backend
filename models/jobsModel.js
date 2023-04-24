import mongoose from "mongoose";
const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Please enter the company name"],
    },
    position: {
      type: String,
      required: [true, "Job position is required"],
    },
    status: {
      type: String,
      enum: ["Applied", "Interview", "Offer", "Rejected", "Pending"],
      default: "Pending",
    },
    workType: {
      type: String,
      enum: ["Full-Time", "Part-Time", "Contract", "Internship"],
      default: "Full-Time",
    },
    workLocation: {
      type: String,
      required: [true, "Please enter the work location"],
      default: "Remote",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      // This ref must be same as the collction name in MongoDB, which you used in userModel
      ref: "users",
    },
  },
  {
    timestamps: true,
  }
);
// here jobs is the collection name in MongoDB
const Job = mongoose.model("jobs", jobSchema);
export default Job;
