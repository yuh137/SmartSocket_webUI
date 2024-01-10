const express = require('express');
const router = express.Router();

let publishController = require("../controllers/publish")

router.post('/', publishController.publishPost);

module.exports = router;