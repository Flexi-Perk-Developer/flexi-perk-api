import { Router } from 'express';

import * as availableOfferController from '@/controllers/availableOffer';
import * as availableOfferValidations from '@/routes/validations/availableOffer';
import * as pagingListValidations from '@/routes/validations/pagingList';
import { isAuthenticated, validate } from '@/middleware';

const router = Router();

router.route('/')
  .get(isAuthenticated, validate(pagingListValidations.pagingListRules),
    availableOfferController.getAvailableOffers)
  .post(isAuthenticated, validate(availableOfferValidations.createAvailableOfferRules),
    availableOfferController.createAvailableOffer);

router.route('/:id')
  .get(isAuthenticated, availableOfferController.getAvailableOfferById)
  .delete(isAuthenticated, availableOfferController.deleteAvailableOffer);

export default router;
