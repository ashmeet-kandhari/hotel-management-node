import bcrypt from 'bcrypt';
import config from '../config';
import {authenticate} from '../services/auth';
import {addUser, getUserByUserName} from '../services/user';

export const login = (req, res) => {
  return authenticate(req.body)
      .then((token) => {
        res.send({
          success: true,
          data: {token},
        });
      })
      .catch((err) => {
        res.send({
          success: false,
          message: err.message,
        });
      });
};

export const register = (req, res) => {
  const username = req.body.username;

  return getUserByUserName(username || '').then((exists) => {
    if (exists) {
      return res.send({
        success: false,
        message:
          'Registration failed. User with this username already registered.',
      });
    }
    const user = {
      ...req.body,
      password: bcrypt.hashSync(req.body.password, config.saltRounds),
    };
    return addUser(user).then(() => res.send({success: true}));
  });
};
