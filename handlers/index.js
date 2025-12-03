const express = require('express');
const router = express.Router();

router.get('/',(req,res) => {
    res.send(`Welcome to Library Management API`);
})

module.exports = router;