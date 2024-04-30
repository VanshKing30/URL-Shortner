const express = require('express');
const router = express.Router();

const { GenerateShortUrl , GetRedirected} = require("../controllers/url")

router.post('/' , GenerateShortUrl);

router.get('/:shortId' , GetRedirected );



module.exports = router;