const express = require('express');
const router = express.Router();

const { GenerateShortUrl , GetRedirected , GetAnalytics} = require("../controllers/url")

router.post('/' , GenerateShortUrl);

router.get('/:shortId' , GetRedirected );

router.get('/analytics/:shortId' , GetAnalytics);



module.exports = router;