const URL = require("../models/urlSchema");
const shortid = require("shortid")



async function GenerateShortUrl (req , res) {

    const body = req.body;

    if(!body.url) return res.status(400).json({error : "url is required"});

    const shortID = shortid();


    await URL.create({
        shortId : shortID,
        redirectURL : body.url,
        visitHistory : [],


    });

    return res.json ({id: shortID});
    


}

async function GetRedirected (req , res) {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    } , {$push : {
        visitHistory : {
            timestamp : Date.now()
        }
    },
}
);
res.redirect(entry.redirectURL);
    
}

module.exports = {
    GenerateShortUrl,GetRedirected
};