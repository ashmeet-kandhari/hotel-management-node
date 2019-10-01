import Sequelize from 'sequelize';

export const db = new Sequelize(
    'postgres://ashmeet:password@localhost:5432/hotel_management',
    {
      dialect: 'postgres',
      pool: {
        max: 1,
        min: 0,
        idle: 10000,
      },
      logging: false,
    }
);

db.authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    });
