import { body, query } from 'express-validator';

export const listRequestedOfferRules = [
  query('page').optional().isInt().toInt(),
  query('perPage').optional().isInt().toInt(),
];

export const createRequestedOfferRules = [
  body('availableOfferId').exists(),
];
