import { Router } from 'express';

import * as claimOffersController from '@/controllers/claimOffer';
import * as claimOffersValidations from '@/routes/validations/claimOffer';
import { isAuthenticated, validate } from '@/middleware';

const router = Router();

router.route('/')
  .get(isAuthenticated, validate(claimOffersValidations.listClaimOffersRules),
    claimOffersController.getClaimOffers)
  .post(isAuthenticated, validate(claimOffersValidations.createClaimOffersRules),
    claimOffersController.createClaimOffer);

router.route('/:id')
  .get(isAuthenticated, claimOffersController.getClaimOfferById)
  .delete(isAuthenticated, claimOffersController.deleteClaimOffer);

export default router;
