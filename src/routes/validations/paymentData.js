import { body } from 'express-validator';

export const createTweetRules = [
  body('amount').isNumeric().exists(),
  body('monthOfIncome').isDate().exists(),
];

export default createTweetRules;
