import {Router} from 'express';
import '@babel/polyfill';
import {getPatient} from '../controllers/patient.controller';
import {
  getPrescription,
  deliverPrescription,
} from '../controllers/prescriptions';

// eslint-disable-next-line new-cap
const router = Router();

router.get('/patient/:mid', getPatient);
router.get('/patient/:mid/prescription', getPrescription);
router.put('/patient/:mid/prescription', deliverPrescription);

export default router;
