const mongoose = require("mongoose");

const companySchema =new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    jobPosted: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
      },
    ],
    logo: {
      type: String, // URL or path to the company logo
      required: false,
    },
      userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    }
  },
  
  { timestamps: true }
);

const Company = mongoose.model("Company", companySchema);

// ✅ Export with consistent naming
module.exports = Company;