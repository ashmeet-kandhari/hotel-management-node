import {Router} from 'express';
import '@babel/polyfill';
import {
  getPatient,
  registerPatient,
  updatePatient,
} from '../controllers/patient';
import {digitizePrescription} from '../controllers/prescriptions';

// eslint-disable-next-line new-cap
const router = Router();

router.get('/patient/:mid', getPatient);
router.put('/patient/:mid', updatePatient);
router.post('/patient', registerPatient);

router.post('/patient/:mid/prescription', digitizePrescription);

export default router;
