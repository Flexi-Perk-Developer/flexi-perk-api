import { body } from 'express-validator';

export const createTweetRules = [
  body('tweet').isLength({ max: 140 }).exists(),
];

export default createTweetRules;
