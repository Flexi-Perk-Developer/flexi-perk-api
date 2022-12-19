import { Router } from 'express';

import * as availableOfferController from '@/controllers/availableOffer';
import * as availableOfferValidations from '@/routes/validations/availableOffer';
import { validate } from '@/middleware';

const router = Router();

router.route('/')
  .get(validate(availableOfferValidations.listAssociatedJobRules), availableOfferController.getAvailableOffers)
  .post(validate(availableOfferValidations.createAvailableOfferRules), availableOfferController.createAvailableOffer);

router.route('/:id')
  .get(availableOfferValidations.getAvailableOfferById)
  .delete(availableOfferValidations.deleteAvailableOffer);

export default router;
