var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var InstaUserSchema = new Schema({
    access_token: String,
    user:
        {
            id: String,
            username: String,
            profile_picture: String,
            full_name: String,
            bio: String,
            website: String,
            is_business: false
        }
}, {strict: false});

module.exports = mongoose.model('instaUser', InstaUserSchema);
