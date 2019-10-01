import Sequelize from 'sequelize';
import {db} from '../database/database';

const modelDefinition = {
  username: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  fullname: Sequelize.STRING,
  age: {type: Sequelize.INTEGER},
  email: {
    type: Sequelize.STRING,
    allowNull: true,
    unique: true,
    validate: {isEmail: {msg: 'Phone number invalid.'}},
  },
  mobile: {
    type: Sequelize.STRING,
    allowNull: true,
    unique: true,
    validate: {
      len: {args: [7, 20], msg: 'Phone number invalid, too short.'},
      isNumeric: {msg: 'not a valid phone number.'},
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  role: {
    type: Sequelize.INTEGER,
  },
};

const modelOptions = {
  timestamps: false,
  freezeTableName: true,
};

const User = db.define('users', modelDefinition, modelOptions);

export default User;
