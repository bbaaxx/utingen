'use strict';

// Profiles routes use profiles controller
var profiles = require('../controllers/profiles');
// var authorization = require('./middlewares/authorization');

// Article authorization helpers
// var hasAuthorization = function(req, res, next) {
//         if (req.profile.user.id !== req.user.id) {
//             return res.send(401, 'User is not authorized');
//         }
//         next();
//     };

module.exports = function(app) {

    app.get('/profiles',
        profiles.all
        );
    app.post('/profiles',
        //authorization.requiresLogin,
        profiles.create
        );
    app.get('/profiles/:profileId',
        profiles.show
        );
    app.put('/profiles/:profileId',
        //authorization.requiresLogin,
        //hasAuthorization,
        profiles.update
        );
    app.del('/profiles/:profileId',
        //authorization.requiresLogin,
        //hasAuthorization,
        profiles.destroy
        );

    // Finish with setting up the profileId param
    app.param('profileId', profiles.profile);

};
