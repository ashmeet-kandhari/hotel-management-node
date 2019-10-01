import {
  getPatientById,
  checkIfPatientIsRegistered,
  addPatientDetails,
  updatePatientDetails
} from '../services/patient'

export async function getPatient (req, res) {
  try {
    const createdata = await getPatientById(req.params.mid)
    if (createdata) {
      return res.json({
        data: createdata
      })
    } else {
      return res.status(404).json({
        message: 'Patient Details Not found'
      })
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      message: 'Something went wrong!'
    })
  }
}

export async function registerPatient (req, res) {
  try {
    const checkdata = await checkIfPatientIsRegistered(
      req.body.fullname,
      req.body.mobile
    )
    if (checkdata) {
      return res.status(409).json({
        message: 'Already Exist',
        data: checkdata
      })
    } else {
      const createdata = await addPatientDetails(req.body, [
        'fullname',
        'email',
        'age',
        'mobile'
      ])
      if (createdata) {
        return res.status(201).json({
          message: 'Patient Registered Successfully',
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

export async function updatePatient (req, res) {
  const update = await updatePatientDetails(req.body, req.params.mid)
    .then(response => {
      if (response[0] === 0) {
        return res.status(404).json({
          message: 'Patient Not found'
        })
      }
      return res.json({
        message: 'Patient Details Updated Successfully',
        data: response[1]
      })
    })
    .catch(err => {
      console.log(err)
      return res.status(500).json({
        message: 'Something went wrong!',
        error: err
      })
    })
  // console.log(update);
  return update
}
