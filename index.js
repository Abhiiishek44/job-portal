const express = require("express");
const mongoose = require("mongoose");
 const userRouter = require("./routers/user");
const jobRouter = require("./routers/job"); 
const applicationRouter=require("./routers/application")
const app = express();
const port = 5000;

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/naukri", {
  // These options are no longer needed with newer Mongoose versions
})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Use Routers
app.use("/api/applications", applicationRouter);
app.use("/api/jobs", jobRouter);
app.use("/api/users", userRouter);

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
