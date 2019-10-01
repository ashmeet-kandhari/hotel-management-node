import {Router} from 'express';
import '@babel/polyfill';
import {getPatient} from '../controllers/patient';
import {
  getPrescription,
  approvePrescription,
} from '../controllers/prescriptions';

// eslint-disable-next-line new-cap
const router = Router();

router.get('/patient/:mid', getPatient);
router.get('/patient/:mid/prescription', getPrescription);
router.put('/patient/:mid/prescription', approvePrescription);

export default router;
