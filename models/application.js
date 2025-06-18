const { default: mongoose } = require("mongoose");


const applicationSchema=new mongoose.Schema({
      jobId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job", // Must match the model name defined in models/job.js
        required: true,
      },
      applicantId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Must match the model name defined in models/user.js
        required: true,
      },
      resume:{
        type: String, // URL or path to the resume file
        required: true,
      },
      status: {
        type: String,
        enum: ["Applied", "Under Review", "Interview Scheduled", "Rejected", "Accepted"],
        default: "Applied",
      },
},{ timestamps: true });

 const  application=mongoose.model("Application", applicationSchema);
module.exports = application;