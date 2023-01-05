import createError from 'http-errors';

import db from '@/database';

/**
 * POST /requestedOffer
 * Create requestedOffer request
 */
export const createRequestedOffer = async (req, res, next) => {
  try {
    const { id: userId } = req.user;

    const requestedOfferData = {
      ...req.body,
      userId,
    };

    const requestedOffer = await db.models.RequestedOffer
      .create(requestedOfferData, {
        fields: ['userId', 'availableOfferId'],
      });

    return res.status(201).json(requestedOffer);
  } catch (err) {
    return next(err);
  }
};

/**
 * GET /requestedOffers
 * List requestedOffers with pagination
 */
export const getRequestedOffers = async (req, res, next) => {
  try {
    const { page = 1, perPage = 10 } = req.query;
    const offset = page * perPage - perPage;

    const requestedOfferListResponse = await db.models.RequestedOffer
      .findAndCountAll({
        offset,
        limit: perPage,
        include: {
          model: db.models.User,
          attributes: ['id', 'firstName', 'lastName'],
        },
        order: [['createdAt', 'DESC']],
      });

    const totalPage = Math.ceil(requestedOfferListResponse.count / perPage);
    const response = {
      ...requestedOfferListResponse, page, totalPage, perPage,
    };
    return res.json(response);
  } catch (err) {
    return next(err);
  }
};

/**
 * GET /requestedOffer/:id
 * Get requestedOfferController by id
 */
export const getRequestedOfferById = async (req, res, next) => {
  try {
    const { id: requestedOfferId } = req.params;

    const requestedOffer = await db.models.RequestedOffer
      .findOne({
        where: { id: requestedOfferId },
        include: {
          model: db.models.User,
          attributes: ['id', 'firstName', 'lastName'],
        },
      });
    if (!requestedOffer) {
      return next(createError(404, 'There is no requestedOffer with this id!'));
    }

    return res.status(200).json(requestedOffer);
  } catch (err) {
    return next(err);
  }
};

/**
 * DELETE /requestedOffer/:id
 * Delete requestedOffer request
 */
export const deleteRequestedOffer = async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const { id: requestedOfferId } = req.params;

    const requestedOffer = await db.models.RequestedOffer.findOne({ where: { id: requestedOfferId, userId } });
    if (!requestedOffer) {
      return next(createError(404, 'There is no requestedOffer with this id!'));
    }

    await requestedOffer.destroy();
    return res.status(204).send();
  } catch (err) {
    return next(err);
  }
};
