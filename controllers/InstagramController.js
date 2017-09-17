var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var instaUser = require('../models/InstaUser');

var config = require('../bin/config');
var instagram = require('instagram-node').instagram();
instagram.use({
    client_id: config.instagram.clientId,
    client_secret: config.instagram.clientSecret
});

var instaController = {};

// Restrict access to root page
instaController.index = function (req, res) {
    instaUser.findOne().exec(function (err, doc) {
        var response = {user: req.user, path: req.path};
        if (!err) {
            response['instagram'] = doc;
        }

        res.render('insta', response);
    });
};

// First redirect user to instagram oauth
instaController.auth = function (req, res) {
    res.redirect(
        instagram.get_authorization_url(config.instagram.apiCallback,
            {scope: ['basic', 'follower_list', 'likes'], state: 'a state'})
    );
};

instaController.authCallback = function (req, res) {
    instagram.authorize_user(req.query.code, config.instagram.apiCallback, function (err, result) {
        if (err) {
            console.log(err.body);
            res.send("Instagram authorization error");
        } else {
            var query = {'user': {id: result.user.id}};
            instaUser.findOneAndUpdate(query, result, {upsert: true, setDefaultsOnInsert: true}, function (err, doc) {
                console.log(err);
                if (err) {
                    res.render('There is some errow with authentication');
                } else {
                    res.redirect('/instagram');
                }
            });
        }
    });
};

instaController.media = function (req, res) {
    instaUser.findOne().exec(function (err, doc) {
        var response = {user: req.user, path: req.path};
        if (!err) {
            response['instagram'] = doc.media;
        }

        res.render('media', {user: req.user, path: req.path});
    });
};

instaController.getMedia = function (req, res) {
    instaUser.findOne().exec(function (err, doc) {
        var response = {user: req.user, path: req.path};
        if (!err) {
            response['instagram'] = doc.media;
        }

        instagram.use({ access_token: doc.user.access_token });
        instagram.user_self_media_recent(function(err, medias, pagination, remaining, limit) {
            console.log(err);
            console.log(medias);
        });
    });

};



module.exports = instaController;
