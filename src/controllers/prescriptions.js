import {
  getPrescriptionByMid,
  checkIfPrescriptionIsDigitized,
  createPrescription,
  updatePrescription,
} from '../services/prescriptions';
import {getPatientById} from './patient';

export async function getPrescription(req, res) {
  try {
    if (!(await getPatientById(req.params.mid))) {
      return res.status(404).json({
        success: false,
        message: 'Patient Not found',
      });
    }

    const createdata = await getPrescriptionByMid(req.params.mid);
    if (createdata) {
      res.json({
        success: true,
        data: createdata,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'Prescription Not found',
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
    });
  }
}

export async function digitizePrescription(req, res) {
  try {
    if (!(await getPatientById(req.params.mid))) {
      return res.status(404).json({
        success: false,
        message: 'Patient Not found',
      });
    }

    const checkdata = await checkIfPrescriptionIsDigitized(
        req.body.prescription
    );
    if (checkdata) {
      res.json({
        message: 'Already Exist',
        data: checkdata,
      });
    } else {
      const createdata = await createPrescription(req.body);
      if (createdata) {
        res.json({
          success: true,
          message: 'Prescription Created Successfully',
          data: createdata,
        });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
    });
  }
}

export function approvePrescription(req, res) {
  return updatePrescriptionInDB(
      req.params.mid,
      {prescription_approved: req.body.prescription_approved},
      res
  );
}

export function deliverPrescription(req, res) {
  return updatePrescriptionInDB(
      req.params.mid,
      {delivered: req.body.delivered},
      res
  );
}

async function updatePrescriptionInDB(mid, updatedJson, res) {
  if (!(await getPatientById(req.params.mid))) {
    return res.status(404).json({
      success: false,
      message: 'Patient Not found',
    });
  }
  const update = await updatePrescription(updatedJson, mid)
      .then((response) => {
        if (response[0] === 0) {
          return res.status(404).json({
            success: false,
            message: 'Patient Not found',
          });
        }
        return res.json({
          success: true,
          message: 'Patient Details Updated Successfully',
          data: response[1],
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          success: false,
          message: 'Something went wrong!',
        });
      });
  return update;
}
