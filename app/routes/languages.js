'use strict';

// Languages routes use languages controller
var languages = require('../controllers/languages');
// var authorization = require('./middlewares/authorization');

// Article authorization helpers
// var hasAuthorization = function(req, res, next) {
//         if (req.language.user.id !== req.user.id) {
//             return res.send(401, 'User is not authorized');
//         }
//         next();
//     };

module.exports = function(app) {

    app.get('/languages',
        languages.all
        );
    app.post('/languages',
        //authorization.requiresLogin,
        languages.create
        );
    app.get('/languages/:languageId',
        languages.show
        );
    app.put('/languages/:languageId',
        //authorization.requiresLogin,
        //hasAuthorization,
        languages.update
        );
    app.del('/languages/:languageId',
        //authorization.requiresLogin,
        //hasAuthorization,
        languages.destroy
        );

    // Finish with setting up the languageId param
    app.param('languageId', languages.language);

};
