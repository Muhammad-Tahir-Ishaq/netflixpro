const express = require('express');
const path = require('path');
const fs = require('fs');
const NetflixVideo = require('../../models/netflix/NetflixVideo');

const addNetflixVideoController = async (req, res) => {
    const { videoTitle, description } = req.body;
    
    // Access files using req.files
    const files = await req.files;
    const {videoFile} = files
    
    // if title is empty
    if (!videoTitle) {
        return res.json({
            success: false,
            message: 'video title is required',
        });
    }

    // Check if the uploaded file is a video
    const allowedVideoTypes = ['video/mp4', 'video/webm', 'video/mkv']; // Add more video types as needed

    if (!allowedVideoTypes.includes(videoFile.type)) {
        return res.json({
            success: false,
            message: 'Invalid file type. Please upload a valid video file.',
        });
    }

    // Handle uploaded files as needed

    // Create a dynamic URL based on server's protocol, host, and port
    const baseUrl = `${req.protocol}://${req.get('host')}`;

    // Create a unique filename based on original filename, current date, and field name
    const currentDate = new Date().toISOString().replace(/[-:]/g, '').split('.')[0];
    const uniqueFileName = `${videoFile.fieldName}_${currentDate}_${videoFile.originalFilename}`;

    // Save the file with the unique filename
    const savedFilePath = path.join(__dirname, '../../public', uniqueFileName);
    // now rename the saved file with <uniqueFileName>
    // Rename the file to the unique filename
    fs.renameSync(videoFile.path, savedFilePath);
    
    // video file link
    const videoLink = `${baseUrl}/${uniqueFileName}`;

    const newVideo = new NetflixVideo({
        videoTitle: videoTitle,
        description: description,
        videoLink: videoLink
    });

    await newVideo.save();

    res.json({
        success: true,
        data: newVideo,
    });
};

module.exports = addNetflixVideoController;
