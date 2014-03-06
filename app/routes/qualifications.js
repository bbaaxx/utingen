'use strict';

// Languages routes use qualifications controller
var qualifications = require('../controllers/qualifications');
// var authorization = require('./middlewares/authorization');

// Article authorization helpers
// var hasAuthorization = function(req, res, next) {
//         if (req.qualification.user.id !== req.user.id) {
//             return res.send(401, 'User is not authorized');
//         }
//         next();
//     };

module.exports = function(app) {

    app.get('/qualifications',
        qualifications.all
        );
    app.post('/qualifications',
        //authorization.requiresLogin,
        qualifications.create
        );
    app.get('/qualifications/:qualificationId',
        qualifications.show
        );
    app.put('/qualifications/:qualificationId',
        //authorization.requiresLogin,
        //hasAuthorization,
        qualifications.update
        );
    app.del('/qualifications/:qualificationId',
        //authorization.requiresLogin,
        //hasAuthorization,
        qualifications.destroy
        );

    // Finish with setting up the qualificationId param
    app.param('qualificationId', qualifications.qualification);

};
