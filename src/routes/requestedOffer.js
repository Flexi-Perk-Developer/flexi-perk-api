import { Router } from 'express';

import * as requestedOfferController from '@/controllers/requestedOffer';
import * as requestedOfferValidations from '@/routes/validations/requestedOffer';
import * as pagingListValidations from '@/routes/validations/pagingList';
import { isAuthenticated, validate } from '@/middleware';

const router = Router();

router.route('/')
  .get(isAuthenticated, validate(pagingListValidations.pagingListRules),
    requestedOfferController.getRequestedOffers)
  .post(isAuthenticated, validate(requestedOfferValidations.createRequestedOfferRules),
    requestedOfferController.createRequestedOffer);

router.route('/:id')
  .get(isAuthenticated, requestedOfferController.getRequestedOfferById)
  .delete(isAuthenticated, requestedOfferController.deleteRequestedOffer);

export default router;
