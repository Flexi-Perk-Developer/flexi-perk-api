import { body } from 'express-validator';

export const createAvailableOfferRules = [
  body('description').isLength({ max: 140 }).exists(),
];

export default createAvailableOfferRules;
