import {login, register} from '../controllers/auth';

export const set = (app) => {
  app.post('/login', login);
  app.post('/register', register);
};
