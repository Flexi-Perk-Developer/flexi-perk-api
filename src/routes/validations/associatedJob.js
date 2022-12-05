import { body, query } from 'express-validator';

export const listAssociatedJobRules = [
  query('page').optional().isInt().toInt(),
  query('perPage').optional().isInt().toInt(),
];

export const createAssociatedJobRules = [
  body('associatedJob').isLength({ max: 140 }).exists(),
];
