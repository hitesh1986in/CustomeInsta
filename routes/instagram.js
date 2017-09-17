var express = require('express');
var router = express.Router();
var instagram = require('../controllers/InstagramController');
var validatorMW = require('./validatorMW');

// Route for Instagram
router.get('/', validatorMW(), instagram.index);

// Authorize instagram
router.get('/auth', validatorMW(), instagram.auth);

// Instagram Authorize callback
router.get('/auth/callback', validatorMW(), instagram.authCallback);

// Route for Instagram Media
router.get('/media', validatorMW(), instagram.media);

router.get('/get/media', validatorMW(), instagram.getMedia);

module.exports = router;
