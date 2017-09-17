module.exports = (function () {
    return {
        db: {
            host: 'localhost',
            port: '27017',
            name: 'custominsta',
            user: 'custominsta',
            pass: 'custominsta'
        },
        instagram: {
            clientId: '32a6d623b6c949809a5ce94fee84a470',
            clientSecret: '7e1ed4c576b24f14be3792ffbac09c8c',
            apiCallback: 'http://localhost:8888/instagram/auth/callback'
        }
    }
})();
