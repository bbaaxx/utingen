'use strict';

// Positions routes use positions controller
var positions = require('../controllers/positions');
// var authorization = require('./middlewares/authorization');

// Article authorization helpers
// var hasAuthorization = function(req, res, next) {
//         if (req.position.user.id !== req.user.id) {
//             return res.send(401, 'User is not authorized');
//         }
//         next();
//     };

module.exports = function(app) {

    app.get('/positions',
        positions.all
        );
    app.post('/positions',
        //authorization.requiresLogin,
        positions.create
        );
    app.get('/positions/:positionId',
        positions.show
        );
    app.put('/positions/:positionId',
        //authorization.requiresLogin,
        //hasAuthorization,
        positions.update
        );
    app.del('/positions/:positionId',
        //authorization.requiresLogin,
        //hasAuthorization,
        positions.destroy
        );

    // Finish with setting up the positionId param
    app.param('positionId', positions.position);

};
