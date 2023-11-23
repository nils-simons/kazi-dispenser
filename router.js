const router = (app) => {

    require('./api/postDispense').postDispense(app);
};

exports.router = router;