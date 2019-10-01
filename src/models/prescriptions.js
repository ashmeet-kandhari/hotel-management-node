import Sequelize from 'sequelize';
import {db} from '../database/database';

const Prescriptions = db.define(
    'prescriptions',
    {
      createdAt: {
        field: 'createdat',
        type: Sequelize.TIME,
        primaryKey: true,
      },
      updatedAt: {
        field: 'updatedat',
        type: Sequelize.TIME,
      },
      prescription: {
      // eslint-disable-next-line new-cap
        type: Sequelize.ARRAY(Sequelize.TEXT),
      },
      prescription_approved: {
        type: Sequelize.BOOLEAN,
      },
      delivered: {
        type: Sequelize.BOOLEAN,
      },
    },
    {
      timestamps: true,
      freezeTableName: true,
    }
);

export default Prescriptions;
