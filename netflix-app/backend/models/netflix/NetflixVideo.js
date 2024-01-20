const mongoose = require('mongoose');
const { Schema } = mongoose;

const netflixVideoSchema = new Schema({
    videoTitle: String,
    description: String,
    videoLink: String,
}, {
    timestamps: true,
});

const NetflixVideo = mongoose.model('videos', netflixVideoSchema);

module.exports = NetflixVideo