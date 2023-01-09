import { Router } from 'express';

import * as referralController from '@/controllers/referral';
import * as referralValidations from '@/routes/validations/referral';
import * as pagingListValidations from '@/routes/validations/pagingList';
import { isAuthenticated, validate } from '@/middleware';

const router = Router();

router.route('/')
  .get(isAuthenticated, validate(pagingListValidations.pagingListRules),
    referralController.getReferrals)
  .post(isAuthenticated, validate(referralValidations.createReferralRules),
    referralController.createReferral);

router.route('/:id')
  .get(isAuthenticated, referralController.getReferralById)
  .delete(isAuthenticated, referralController.deleteReferral);

export default router;
