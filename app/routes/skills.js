'use strict';

// Skills routes use skills controller
var skills = require('../controllers/skills');
// var authorization = require('./middlewares/authorization');

// Article authorization helpers
// var hasAuthorization = function(req, res, next) {
//         if (req.skill.user.id !== req.user.id) {
//             return res.send(401, 'User is not authorized');
//         }
//         next();
//     };

module.exports = function(app) {

    app.get('/skills',
        skills.all
        );
    app.post('/skills',
        //authorization.requiresLogin,
        skills.create
        );
    app.get('/skills/:skillId',
        skills.show
        );
    app.put('/skills/:skillId',
        //authorization.requiresLogin,
        //hasAuthorization,
        skills.update
        );
    app.del('/skills/:skillId',
        //authorization.requiresLogin,
        //hasAuthorization,
        skills.destroy
        );
    app.get('/skills/is/:isQry',
        //authorization.requiresLogin,
        //hasAuthorization,
        skills.instaSearch
        );

    // Finish with setting up the skillId param
    app.param('skillId', skills.skill);
};
