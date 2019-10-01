import express from 'express';
import bodyParser from 'body-parser';
import {set} from './routes/index';

// Importing Routes
// import NurseRoutes from './routes/nurse';
// import DoctorRoutes from './routes/doctor';
// import PharmacistRoutes from './routes/pharmacist';

const app = express();

// middlewares
app.all('*', function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, PUT, OPTIONS, DELETE, GET');
  res.header('Access-Control-Max-Age', '3600');
  res.header(
      'Access-Control-Allow-Headers',
      'Content-Type, Access-Control-Allow-Headers, ' +
      'Authorization, X-Requested-With, x-access-token'
  );
  next();
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
set(app);

// routes
// app.use('/', login);
// app.use('/api/nurse', NurseRoutes);
// app.use('/api/doctor', DoctorRoutes);
// app.use('/api/pharmacist', PharmacistRoutes);

export default app;
