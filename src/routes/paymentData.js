import { Router } from 'express';

import * as paymentDataController from '@/controllers/paymentData';
import * as paymentDataValidations from '@/routes/validations/paymentData';
import * as pagingListValidations from '@/routes/validations/pagingList';
import { isAuthenticated, validate } from '@/middleware';

const router = Router();

router.route('/')
  .get(isAuthenticated, validate(pagingListValidations.pagingListRules),
    paymentDataController.getPaymentData)
  .post(isAuthenticated, validate(paymentDataValidations.createPaymentDataRules),
    paymentDataController.createPaymentData);

router.route('/:id')
  .get(isAuthenticated, paymentDataController.getPaymentDataById)
  .delete(isAuthenticated, paymentDataController.deletePaymentData);

export default router;
