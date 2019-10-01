import { Router } from 'express'
import '@babel/polyfill'
import {
  getPatient,
  registerPatient,
  updatePatient
} from '../controllers/patient'
import {
  getPrescription,
  getPrescriptions,
  digitizePrescription,
  approvePrescription,
  deliverPrescription
} from '../controllers/prescriptions'
import { login, register } from '../controllers/auth'
import { checkAuthorization } from '../middlewares/auth'

// eslint-disable-next-line new-cap
const router = Router()

router.post('/login', login)
router.post('/register', checkAuthorization(['admin']), register)

// patient related routes
router.get(
  '/patient/:mid',
  checkAuthorization(['admin', 'nurse', 'doctor', 'pharmacist']),
  getPatient
)

router.put(
  '/patient/:mid',
  checkAuthorization(['admin', 'nurse']),
  updatePatient
)
router.post('/patient', checkAuthorization(['admin', 'nurse']), registerPatient)

// prescriptions
router.get(
  '/patient/:mid/prescription',
  checkAuthorization(['admin', 'nurse', 'doctor', 'pharmacist']),
  getPrescriptions
)

router.post(
  '/patient/:mid/prescription',
  checkAuthorization(['admin', 'nurse']),
  digitizePrescription
)

router.put(
  '/patient/:mid/prescription/:id',
  checkAuthorization(['admin', 'pharmacist']),
  deliverPrescription
)

router.put(
  '/patient/:mid/prescription/:id',
  checkAuthorization(['admin', 'doctor']),
  approvePrescription
)

router.get(
  '/patient/:mid/prescription/:id',
  checkAuthorization(['admin', 'nurse', 'doctor', 'pharmacist']),
  getPrescription
)

export default router
