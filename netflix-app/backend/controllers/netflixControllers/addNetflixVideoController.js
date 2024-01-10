const express = require('express');
const Netflixvideo = require('../models/netflix/NetflixVideo');
const addNetflixVideoController = async(req, res)=> {
    const { description } = req.body

    // db ki ser kr k aye
    const newDescription = new Netflixvideo({
        description: description
    })

    await newDescription.save();
    console.log(newDescription)

    res.json({
        success: true,
        description: description
    })
}
module.exports = addNetflixVideoController