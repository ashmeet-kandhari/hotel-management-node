import {
  getPatientById,
  checkIfPatientIsRegistered,
  addPatientDetails,
} from '../services/patient';

export async function getPatient(req, res) {
  try {
    const createdata = await getPatientById(req.params.mid);
    if (createdata) {
      res.json({
        success: true,
        data: createdata,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'Patient Not found',
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

export async function registerPatient(req, res) {
  try {
    const checkdata = await checkIfPatientIsRegistered(
        req.body.fullname,
        req.body.mobile
    );
    if (checkdata) {
      res.json({
        message: 'Already Exist',
        data: checkdata,
      });
    } else {
      const createdata = await addPatientDetails(req.body, [
        'fullname',
        'email',
        'age',
        'mobile',
      ]);
      if (createdata) {
        res.json({
          success: true,
          message: 'Patient Registered Successfully',
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

export async function updatePatient(req, res) {
  const update = await updatePatientDetails(req.body, req.params.mid)
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
          error: err,
        });
      });
  // console.log(update);
  return update;
}
