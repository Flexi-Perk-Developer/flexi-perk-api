import { body } from 'express-validator';

export const createTweetRules = [
  body('name').exists(),
  // Optional fields?
  // body('contactNumber').exists(),
  // body('email').exists(),
];

export default createTweetRules;
