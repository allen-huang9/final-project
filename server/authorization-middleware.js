const ClientError = require('./client-error');
const jwt = require('jsonwebtoken');

function authorizationMiddleware(req, res, next) {
  const accessToken = req.headers['x-access-token'];
  if (!accessToken) {
    throw new ClientError(401, 'Authentication required');
  }

  const payload = jwt.verify(accessToken, process.env.TOKEN_SECRET);
  req.user = payload;
  next();
}

module.exports = authorizationMiddleware;
