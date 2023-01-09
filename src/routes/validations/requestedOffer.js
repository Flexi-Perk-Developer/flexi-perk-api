import { body } from 'express-validator';

export const createTweetRules = [
  body('availableOfferId').exists(),
];

export default createTweetRules;
