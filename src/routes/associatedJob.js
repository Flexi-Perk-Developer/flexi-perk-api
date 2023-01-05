import { Router } from 'express';

import * as associatedJobController from '@/controllers/associatedJob';
import * as associatedJobValidations from '@/routes/validations/associatedJob';
import { isAuthenticated, validate } from '@/middleware';

const router = Router();

router.route('/')
  .get(isAuthenticated, validate(associatedJobValidations.listAssociatedJobRules),
    associatedJobController.getAssociatedJobs)
  .post(isAuthenticated, validate(associatedJobValidations.createAssociatedJobRules),
    associatedJobController.createAssociatedJob);

router.route('/:id')
  .get(isAuthenticated, associatedJobController.getAssociatedJobById)
  .delete(isAuthenticated, associatedJobController.deleteAssociatedJob);

export default router;
