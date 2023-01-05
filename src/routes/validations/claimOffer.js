import { body, query } from 'express-validator';

export const listClaimOffersRules = [
  query('page').optional().isInt().toInt(),
  query('perPage').optional().isInt().toInt(),
];

export const createClaimOffersRules = [
  body('requestOfferId').exists(),
];
