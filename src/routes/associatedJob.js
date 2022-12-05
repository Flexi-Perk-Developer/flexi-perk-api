import { Router } from 'express';

import * as associatedJobController from '@/controllers/associatedJob';
import * as associatedJobValidations from '@/routes/validations/associatedJob';
import { cache, validate } from '@/middleware';

const router = Router();

router.route('/')
  .get(validate(associatedJobValidations.listAssociatedJobRules), associatedJobController.getAssociatedJobs)
  .post(validate(associatedJobValidations.createAssociatedJobRules), associatedJobController.createAssociatedJob);

router.route('/:id')
  .get(associatedJobController.getAssociatedJobById)
  .delete(associatedJobController.deleteAssociatedJob);

export default router;
