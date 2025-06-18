const expreses = require('express');
const router = expreses.Router();
const { registerUser,loginUser,updateProfile } = require("../controller/userController")

router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/update/:id',updateProfile);

module.exports = router;
