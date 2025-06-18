const express=require("express")
const router=express.Router()
const { applyForJob,getApplicationByUser,getApplicationByJob,}=require("../controller/applicationController");

router.post("/applyForJob",applyForJob);
router.get("/getApplicationByUser",getApplicationByUser)
router.get("/getApplicationByJob",getApplicationByJob)

module.exports=router;