
const User =require("../models/user")
const registerUser = async(req, res) => {
    const {name,email,password,mobileNumber}=req.body;
    if (!name || !email || !password || !mobileNumber) {
        return res.status(400).json({ message: "All fields are required" });
    }  
    const user= await User.create({
        name,
        email,
        password,
        mobileNumber
    }).then((user) => {
        res.status(201).json({ message: "User registered successfully", user });
    })
}
const loginUser = async(req, res) => {
    res.status(200).json({ message: "Login successful" });
}

const updateProfile = async (req, res) => {
  const { name, email, mobileNumber } = req.body;
  const id = req.params.id;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          name,
          email,
          mobileNumber,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
  } catch (err) {
    res.status(500).json({
      message: "Error occurred while updating profile",
      error: err.message || err.toString(),
    });
  }
};

// const uploadResume=async (req,res)=>{
//     const resume=body.resume;
// }



module.exports={
    registerUser,
    loginUser,
    updateProfile
}