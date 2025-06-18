const { default: mongoose } = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    jobType: {
      type: String,
      required: true,
      enum: ["Full-time", "Part-time", "Contract", "Internship"],
      default: "Full-time",
    },
    salary: {
      type: Number,
      required: false,
    },
    experience: {
      type: String,
      required: true,
      enum: ["Fresher", "1-3 years", "3-5 years", "5+ years"],
      default: "Fresher",
    },
    skills: {
      type: [String], // Array of required skills
      default: [],
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "company",
      required: true,
    },
  },
  { timestamps: true }
);
const Job = mongoose.model("Job", jobSchema);

module.exports = Job;