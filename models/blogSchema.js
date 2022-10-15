
const mongoose = require('mongoose');
const blogPost = new mongoose.Schema({
    username: String,
    title: String,
    image: Array,
    text: Array,
    heading:Array,
    pattern: String,
    getid: String,
    view: {type:Number, default: 0}

});

const blog = mongoose.model('blog', blogPost);

module.exports = blog;