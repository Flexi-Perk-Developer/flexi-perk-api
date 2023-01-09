import { Router } from 'express';

import * as associatedJobController from '@/controllers/associatedJob';
import * as associatedJobValidations from '@/routes/validations/associatedJob';
import * as pagingListValidations from '@/routes/validations/pagingList';
import { isAuthenticated, validate } from '@/middleware';

const router = Router();

router.route('/')
  .get(isAuthenticated, validate(pagingListValidations.pagingListRules),
    associatedJobController.getAssociatedJobs)
  .post(isAuthenticated, validate(associatedJobValidations.createAssociatedJobRules),
    associatedJobController.createAssociatedJob);

router.route('/:id')
  .get(isAuthenticated, associatedJobController.getAssociatedJobById)
  .delete(isAuthenticated, associatedJobController.deleteAssociatedJob);

export default router;
