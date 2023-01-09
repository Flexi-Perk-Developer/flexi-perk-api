import createError from 'http-errors';

import db from '@/database';

/**
 * POST /paymentData
 * Create paymentData request
 */
export const createPaymentData = async (req, res, next) => {
  try {
    const userId = req.user ? req.user.id : null;

    const paymentDataFields = {
      ...req.body,
      userId,
    };

    const paymentData = await db.models.PaymentData
      .create(paymentDataFields, {
        fields: ['associatedJobId', 'monthOfIncome', 'amount'],
      });

    return res.status(201).json(paymentData);
  } catch (err) {
    return next(err);
  }
};

/**
 * GET /paymentData
 * List paymentData with pagination
 */
export const getPaymentData = async (req, res, next) => {
  try {
    const { page = 1, perPage = 10 } = req.query;
    const offset = page * perPage - perPage;

    const paymentDataListResponse = await db.models.PaymentData
      .findAndCountAll({
        offset,
        limit: perPage,
        include: {
          model: db.models.User,
          attributes: ['id', 'firstName', 'lastName'],
        },
        order: [['createdAt', 'DESC']],
      });

    const totalPage = Math.ceil(paymentDataListResponse.count / perPage);
    const response = {
      ...paymentDataListResponse, page, totalPage, perPage,
    };
    return res.json(response);
  } catch (err) {
    return next(err);
  }
};

/**
 * GET /paymentData/:id
 * Get paymentDataController by id
 */
export const getPaymentDataById = async (req, res, next) => {
  try {
    const { id: paymentDataId } = req.params;

    const paymentData = await db.models.PaymentData
      .findOne({
        where: { id: paymentDataId },
        include: {
          model: db.models.AssociatedJob,
          attributes: ['description'],
          include: {
            model: db.models.User,
            attributes: ['id', 'firstName', 'lastName'],
          },
        },
      });
    if (!paymentData) {
      return next(createError(404, 'There is no paymentData with this id!'));
    }

    return res.status(200).json(paymentData);
  } catch (err) {
    return next(err);
  }
};

/**
 * DELETE /paymentData/:id
 * Delete paymentData request
 */
export const deletePaymentData = async (req, res, next) => {
  try {
    const { id: paymentDataId } = req.params;

    const paymentData = await db.models.PaymentData.findOne({ where: { id: paymentDataId } });
    if (!paymentData) {
      return next(createError(404, 'There is no paymentData with this id!'));
    }

    await paymentData.destroy();
    return res.status(204).send();
  } catch (err) {
    return next(err);
  }
};
