import Patient from '../models/patient'

export const getPatientById = mid => Patient.findByPk(parseInt(mid))

export const checkIfPatientIsRegistered = (fullname, mobile) =>
  Patient.findOne({
    where: {
      fullname: fullname,
      mobile: mobile
    }
  })

export const addPatientDetails = (body, fieldsArr) =>
  Patient.create(body, {
    fields: fieldsArr
  })

export const updatePatientDetails = (body, mid) =>
  Patient.update(body, {
    returning: true,
    where: { mid: mid }
  })
