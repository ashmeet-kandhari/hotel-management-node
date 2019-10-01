import Sequelize from 'sequelize';
import Prescriptions from './prescriptions';
import {db} from '../database/database';

const Patient = db.define(
    'patient',
    {
      mid: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      fullname: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
      },
      age: {
        type: Sequelize.INTEGER,
      },
      mobile: {
        type: Sequelize.STRING,
        unique: true,
      },
      createdAt: {
        field: 'createdat',
        type: Sequelize.TIME,
      },
      updatedAt: {
        field: 'updatedat',
        type: Sequelize.TIME,
      },
    },
    {
      timestamps: true,
      freezeTableName: true,
    }
);

Patient.hasMany(Prescriptions, {foreignKey: 'mid'});

export default Patient;
