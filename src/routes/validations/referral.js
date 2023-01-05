import { body, query } from 'express-validator';

export const listReferralRules = [
  query('page').optional().isInt().toInt(),
  query('perPage').optional().isInt().toInt(),
];

export const createReferralRules = [
  body('name').exists(),
  // Optional fields?
  // body('contactNumber').exists(),
  // body('email').exists(),
];
