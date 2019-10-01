import {
  getPrescriptionById,
  getPrescriptionByMid,
  checkIfPrescriptionIsDigitized,
  createPrescription,
  updatePrescription
} from '../services/prescriptions'
import { getPatientById } from '../services/patient'

export async function getPrescription (req, res) {
  try {
    if (!(await getPatientById(req.params.mid))) {
      return res.status(404).json({
        message: 'Patient Not found'
      })
    }

    const createdata = await getPrescriptionById(req.params.id)
    if (createdata) {
      return res.json({
        data: createdata
      })
    } else {
      return res.status(404).json({
        message: 'Prescription Not found'
      })
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      message: 'Something went wrong!'
    })
  }
}

export async function getPrescriptions (req, res) {
  try {
    if (!(await getPatientById(req.params.mid))) {
      return res.status(404).json({
        message: 'Patient Not found'
      })
    }

    const createdata = await getPrescriptionByMid(req.params.mid)
    if (createdata) {
      return res.json({
        data: createdata
      })
    } else {
      return res.status(404).json({
        message: 'Prescription Not found'
      })
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      message: 'Something went wrong!'
    })
  }
}

export async function digitizePrescription (req, res) {
  try {
    if (!(await getPatientById(req.params.mid))) {
      return res.status(404).json({
        message: 'Patient Not found'
      })
    }

    const checkdata = await checkIfPrescriptionIsDigitized({
      mid: req.params.mid,
      prescription: req.body.prescription
    })
    if (checkdata) {
      return res.status(409).json({
        message: 'Already Exist',
        data: checkdata
      })
    } else {
      const createdata = await createPrescription({
        mid: req.params.mid,
        ...req.body
      })
      if (createdata) {
        return res.status(201).json({
          message: 'Prescription Created Successfully',
          data: createdata
        })
      }
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      message: 'Something went wrong!'
    })
  }
}

export function approvePrescription (req, res) {
  return updatePrescriptionInDB(
    req.params.mid,
    req.params.id,
    { prescription_approved: req.body.prescription_approved },
    res
  )
}

export function deliverPrescription (req, res) {
  return updatePrescriptionInDB(
    req.params.mid,
    req.params.id,
    { delivered: req.body.delivered },
    res
  )
}

async function updatePrescriptionInDB (mid, id, updatedJson, res) {
  if (!(await getPatientById(mid))) {
    return res.status(404).json({
      message: 'Patient Not found'
    })
  }
  const update = await updatePrescription(updatedJson, id)
    .then(response => {
      if (response[0] === 0) {
        return res.status(404).json({
          message: 'Prescription not digitized for the user'
        })
      }
      return res.json({
        message: 'Prescription Updated Successfully',
        data: response[1]
      })
    })
    .catch(err => {
      console.log(err)
      return res.status(500).json({
        message: 'Something went wrong!'
      })
    })
  return update
}
