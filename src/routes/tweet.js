import { Router } from 'express';

import * as tweetController from '@/controllers/tweet';
import * as tweetValidations from '@/routes/validations/tweet';
import * as pagingListValidations from '@/routes/validations/pagingList';
import { cache, isAuthenticated, validate } from '@/middleware';

const router = Router();

router.route('/')
  .get(isAuthenticated, validate(pagingListValidations.pagingListRules), tweetController.getTweets)
  .post(isAuthenticated, validate(tweetValidations.createTweetRules), tweetController.createTweet);

router.route('/:id')
  .get(cache('Tweet', 'req.params.id'), tweetController.getTweetById)
  .delete(isAuthenticated, tweetController.deleteTweet);

export default router;
