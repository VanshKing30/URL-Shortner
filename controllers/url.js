const URL = require("../models/urlSchema");
const {nanoid} = require('nanoid');



async function GenerateShortUrl (req , res) {

    const body = req.body;

    if(!body.url) return res.status(400).json({error : "url is required"});

    const shortID = nanoid(8);


    await URL.create({
        shortId : shortID,
        redirectURL : body.url,
        visitHistory : [],


    });

    return res.json ({id: shortID});
    


}

module.exports = {
    GenerateShortUrl,
};