import jwt from 'jsonwebtoken';
import config from '../config';

export const checkAuth = (req, res, next) => {
  const token = req.headers['token'];
  if (!token) {
    return res.status(403).send({auth: false, message: 'No token provided.'});
  }

  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) {
      return res
          .status(500)
          .send({auth: false, message: 'Failed to authenticate token.'});
    }
    req.user = {
      login: decoded.login,
      id: decoded.id,
    };
    next();
  });
};
