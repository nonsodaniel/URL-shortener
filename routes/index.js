//contains post routes to be able to create a post route to be inserted into db

const express = require('express');
const router = express.Router();
const validUrl = require("valid-url");
const shortid = require('shortid');
const config = require("config");
const url = require('../models/url');

//  @route   POST /api/url/shorten
// @desc     Create a short URL

router.post('/shorten', (req, res) => {
    const { longUrl } = config.get('baseUrl');


    //check base url
    if (!validUrl.isUri(baseUrl)) {
        return res.status(401).json('Invalid base url');
    }

    //create Url code
    const urlCode = shortid.generate()

    //check long url 
    if (validUrl.isUri(longUrl)) {
        try {
            let url = await Url.findOne({ longUrl });
            if (url) { res.json(url) } else {
                const shortUrl = baseUrl + "/" + urlCode;

                url = new Url({
                    longUrl, shortUrl, urlCode, date: Date.now()
                })
                await url.save();
                res.json(url);
            }
        } catch (err) {
            console.log(err)
            res.status(500).json("Server error");
        }
    } else {
        res.status(401).json("Invalid long url")
    }
})

module.exports = router;