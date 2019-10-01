import { Op } from 'sequelize'
import Prescriptions from '../models/prescriptions'

export const createPrescription = params =>
  Prescriptions.create(params, { fields: ['mid', 'prescription'] })

export const getPrescriptionById = id => Prescriptions.findByPk(id)

export const getPrescriptionByMid = mid =>
  Prescriptions.findAll({
    where: { mid: parseInt(mid) },
    order: [['createdat', 'DESC']]
  })

export const checkIfPrescriptionIsDigitized = params =>
  Prescriptions.findOne({
    where: {
      mid: params.mid,
      prescription: { [Op.eq]: params.prescription },
      prescription_approved: false,
      delivered: false
    }
  })

export const updatePrescription = (json, id) =>
  Prescriptions.update(json, { returning: true, where: { id: id } })
