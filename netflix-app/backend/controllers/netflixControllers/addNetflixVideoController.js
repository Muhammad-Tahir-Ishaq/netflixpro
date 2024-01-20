const path = require('path');
const fs = require('fs');
const express = require('express');
const NetflixVideo = require('../../models/netflix/NetflixVideo');

const addNetflixVideoController = async (req, res) => {
    const { videoTitle, description } = req.body;
    // Access files using req.files
    const files = await req.files;
    console.log(req.files);

    // to upload file in server
    files.upload;

    // generate link for fe dev
    // Create a dynamic URL based on server's protocol, host, and port
    const baseUrl = `${req.protocol}://${req.get('host')}`;

    // renaming file name
    // Create a unique filename based on original filename, current date, and field name
    const currentDate = new Date().toISOString().replace(/[-:]/g, '').split('.')[0];
    const uniqueFileName = `${files.files.fieldName}_${currentDate}_${files.files.originalFilename}`;

    // saving or actually renaming the file
    // Ensure that the destination directory exists
    const destinationDirectory = path.join('./public');
    if (!fs.existsSync(destinationDirectory)) {
        fs.mkdirSync(destinationDirectory, { recursive: true });
    }

    // Save the file with the unique filename
    const savedFilePath = path.join(destinationDirectory, uniqueFileName);
    fs.renameSync(files.files.path, savedFilePath); // Fix the typo here

    console.log(uniqueFileName);

    if (!videoTitle) {
        return res.json({
            success: false,
            message: 'video title is required',
        });
    }

    const newVideo = new NetflixVideo({
        videoTitle: videoTitle,
        description: description,
    });

    await newVideo.save();

    res.json({
        success: true,
        data: newVideo,
    });
};

module.exports = addNetflixVideoController;
