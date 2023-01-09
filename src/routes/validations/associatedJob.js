import { body } from 'express-validator';

export const createAssociatedJobRules = [
  body('description').isLength({ max: 140 }).exists(),
];

export default createAssociatedJobRules;
