import { query } from 'express-validator';

export const pagingListRules = [
  query('page').optional().isInt().toInt(),
  query('perPage').optional().isInt().toInt(),
];

export default pagingListRules;
