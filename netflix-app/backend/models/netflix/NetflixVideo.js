const mongoose =  require ('mongoose');
const { Schema } = mongoose;

const netflixVideoSchema = new Schema({
    description: String,
},{
    timestamps: true, 
});

const NetflixVideo = mongoose.model('posts', netflixVideoSchema);

module.exports = NetflixVideo