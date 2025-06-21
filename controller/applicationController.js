const Application=require("../models/application")
const user= require("../models/user")

const applyForJob= async(req,res)=>{
    try{
        const{jobId,applicantId,resume}=req.body
        if(!jobId || !applicantId || !resume){
            return res.status(400).json({message: "Missing required fields"})
        }
        const alreadyApplied=await Application.findOne({jobId,applicantId});
        if(alreadyApplied){
            return res.status(400).json({message:"Already applied for this  job"})
        }
     
         const application=await Application.create({
            jobId,
            applicantId,
            resume,
         })
            res.status(201).json({ message: "Application submitted", data: application });

    }catch(err){
          res.status(500).json({ message: "Server error", error: err.message });
    }
}
 // Get all applications for a job (for user dashboard)
const getApplicationByUser=async (req,res)=>{
    try{
       const userId=req.params.Id;
       const application=await Application.find({applicantId:userId})

       res.status(200).json(application)
    }catch(error){
         res.status(500).json({ message: "Failed to fetch applications", error });
    }
}

// Get all applications for a job (for company dashboard)

const getApplicationByJob= async (req,res)=>{
    try{
        const jobId=req.params.jobId;

        const applications=await Application.find({jobId})

        res.status(200).json(applications);
    }catch(err){
        res.status(500).json({message: "Failed to fetch applications",err})
    }
}

module.exports={
  applyForJob,
  getApplicationByUser,
  getApplicationByJob,
}

