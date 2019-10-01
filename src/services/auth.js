import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {getUserByUserName} from './user';
import config from '../config';

export const authenticate = (params) => {
  return getUserByUserName(params.username).then((user) => {
    if (!user) {
      throw new Error('Authentication failed. User not found.');
    }
    if (!bcrypt.compareSync(params.password || '', user.password)) {
      throw new Error('Authentication failed. Wrong password.');
    }

    const payload = {
      username: user.username,
      role: user.role,
      time: new Date(),
    };
    const token = jwt.sign(payload, config.jwtSecret, {
      expiresIn: config.tokenExpireTime,
    });
    return token;
  });
};
