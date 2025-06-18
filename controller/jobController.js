const { default: mongoose } = require("mongoose");
const Job=require("../models/job")

const createJob = async (req, res) => {
  const {
    title,
    description,
    company,
    location,
    jobType,
    salary,
    experience,
    skills,
    postedBy,
  } = req.body;

  if (
    !title || !description || !company || !location ||
    !jobType || !experience || !skills || !postedBy
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const job = await Job.create({
      title,
      description,
      company,
      location,
      jobType,
      salary,
      experience,
      skills,
      postedBy,
    });

    res.status(201).json({message: "Job created successfully",job});
  } catch (err) {
    res.status(500).json({
      message: "Error occurred during job creation",
      error: err.message, // 🛠 shows actual error
    });
  }
};

const updateJob = async (req, res) => {
  const id = req.params.id; // Use `id` not `_id` in route parameters

  const { title, description, location, jobType, salary, experience, skills } =
    req.body;

  try {
    const updatedJob = await Job.findByIdAndUpdate(
      id,
      {
        $set: {
          title,
          description,
          location,
          jobType,
          salary,
          experience,
          skills,
        },
      },
      { new: true } // Return the updated document
    );

    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({
      message: "Job updated successfully",
      job: updatedJob,
    });
  } catch (err) {
    res.status(500).json({ message: "Error updating job", error: err.message });
  }
};

const deleteJob=async (req,res)=>{
    try{
        const id=req.params.id;
        const deleteJob=job.findByIdAndDelete(id)
        res.status(200).json({message:"Job deleted successfully.",deleteJob})
    }catch(err){
       res.status(500).json({ message: "Error deleting job", err: err.message });
    }
}

module.exports = {
  createJob,
  updateJob,
  deleteJob
};