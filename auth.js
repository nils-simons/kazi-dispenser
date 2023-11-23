const serverConfig = require('./configs/server.json');

const authReq = (req, res, next) => {
    const header = req.headers.authorization;
    if (!req.headers.authorization || !header.includes('Bearer ')) {
        res.sendStatus(400);
        return
    }
    const token = header.split('Bearer ')[1];
    if (!token || token.length == 0) {
        res.sendStatus(400);
        return
    }
    if (token !== serverConfig.API_SECRET) {
        res.sendStatus(403);
        return
    }
    next();
};

exports.authReq = authReq;