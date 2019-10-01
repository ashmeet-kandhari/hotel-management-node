import Prescriptions from '../models/prescriptions';

export const createPrescription = (params) =>
  Prescriptions.create(params, {fields: ['mid', 'prescription']});

export const getPrescriptionByMid = (mid) =>
  Prescriptions.findOne({
    where: {mid: parseInt(mid)},
    order: [['createdat', 'DESC']],
  });

export const checkIfPrescriptionIsDigitized = (prescription) =>
  Prescriptions.findOne({
    where: {
      prescription: {[Op.eq]: prescription},
      prescription_approved: false,
      delivered: false,
    },
  });

export const updatePrescription = (json, mid) =>
  Prescriptions.update(json, {returning: true, where: {mid: mid}});
