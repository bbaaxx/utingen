'use strict';

// Dossiers routes use dossiers controller
var dossiers = require('../controllers/dossiers');
var authorization = require('./middlewares/authorization');

// Dossier authorization helpers
var hasAuthorization = function(req, res, next) {
    if (req.dossier.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {

    app.get('/dossiers', dossiers.all);
    app.post('/dossiers', authorization.requiresLogin, dossiers.create);
    app.get('/dossiers/:dossierId', dossiers.show);
    app.put('/dossiers/:dossierId', authorization.requiresLogin, hasAuthorization, dossiers.update);
    app.del('/dossiers/:dossierId', authorization.requiresLogin, hasAuthorization, dossiers.destroy);

    // Finish with setting up the dossierId param
    app.param('dossierId', dossiers.dossier);

};