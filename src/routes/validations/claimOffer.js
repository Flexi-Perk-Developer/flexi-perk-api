import { body } from 'express-validator';

export const createClaimOffersRules = [
  body('requestOfferId').exists(),
];

export default createClaimOffersRules;
