import createError from 'http-errors';

import db from '@/database';

/**
 * POST /associatedJob
 * Create associatedJob request
 */
export const createAssociatedJob = async (req, res, next) => {
  try {
    const { id: userId } = req.user;

    const associatedJobData = {
      ...req.body,
      userId,
    };

    const associatedJob = await db.models.AssociatedJob
      .create(associatedJobData, {
        fields: ['userId', 'description'],
      });

    return res.status(201).json(associatedJob);
  } catch (err) {
    return next(err);
  }
};

/**
 * GET /associatedJobs
 * List associatedJobs with pagination
 */
export const getAssociatedJobs = async (req, res, next) => {
  try {
    const { page = 1, perPage = 10 } = req.query;
    const offset = page * perPage - perPage;

    const associatedJobListResponse = await db.models.AssociatedJob
      .findAndCountAll({
        offset,
        limit: perPage,
        include: {
          model: db.models.User,
          attributes: ['id', 'firstName', 'lastName'],
        },
        order: [['createdAt', 'DESC']],
      });

    const totalPage = Math.ceil(associatedJobListResponse.count / perPage);
    const response = {
      ...associatedJobListResponse, page, totalPage, perPage,
    };
    return res.json(response);
  } catch (err) {
    return next(err);
  }
};

/**
 * GET /associatedJob/:id
 * Get associatedJobController by id
 */
export const getAssociatedJobById = async (req, res, next) => {
  try {
    const { id: associatedJobId } = req.params;

    const associatedJob = await db.models.AssociatedJob
      .findOne({
        where: { id: associatedJobId },
        include: {
          model: db.models.User,
          attributes: ['id', 'firstName', 'lastName'],
        },
      });
    if (!associatedJob) {
      return next(createError(404, 'There is no associatedJob with this id!'));
    }

    return res.status(200).json(associatedJob);
  } catch (err) {
    return next(err);
  }
};

/**
 * DELETE /associatedJob/:id
 * Delete associatedJob request
 */
export const deleteAssociatedJob = async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const { id: associatedJobId } = req.params;

    const associatedJob = await db.models.AssociatedJob.findOne({ where: { id: associatedJobId, userId } });
    if (!associatedJob) {
      return next(createError(404, 'There is no associatedJob with this id!'));
    }

    await associatedJob.destroy();
    return res.status(204).send();
  } catch (err) {
    return next(err);
  }
};
