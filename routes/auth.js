const express = require('express');
const { Register, SignIn } = require('../controllers/auth');
const router = express.Router();

router.post("/register", Register);
router.post("/signin", SignIn);

module.exports = router;