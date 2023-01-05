import createError from 'http-errors';

import db from '@/database';

/**
 * POST /AvailableOffer
 * Create AvailableOffer request
 */
export const createAvailableOffer = async (req, res, next) => {
  try {
    const { id: userId } = req.user;

    const availableOfferData = {
      ...req.body,
      userId,
    };

    const availableOffer = await db.models.AvailableOffer
      .create(availableOfferData, {
        fields: ['userId', 'description'],
      });

    return res.status(201).json(availableOffer);
  } catch (err) {
    return next(err);
  }
};

/**
 * GET /AvailableOffers
 * List AvailableOffers with pagination
 */
export const getAvailableOffers = async (req, res, next) => {
  try {
    const { page = 1, perPage = 10 } = req.query;
    const offset = page * perPage - perPage;

    const availableOfferListResponse = await db.models.AvailableOffer
      .findAndCountAll({
        offset,
        limit: perPage,
        include: {
          model: db.models.User,
          attributes: ['id', 'firstName', 'lastName'],
        },
        order: [['createdAt', 'DESC']],
      });

    const totalPage = Math.ceil(availableOfferListResponse.count / perPage);
    const response = {
      ...availableOfferListResponse, page, totalPage, perPage,
    };
    return res.json(response);
  } catch (err) {
    return next(err);
  }
};

/**
 * GET /AvailableOffer/:id
 * Get AvailableOfferController by id
 */
export const getAvailableOfferById = async (req, res, next) => {
  try {
    const { id: AvailableOfferId } = req.params;

    const availableOffer = await db.models.AvailableOffer
      .findOne({
        where: { id: AvailableOfferId },
        include: {
          model: db.models.User,
          attributes: ['id', 'firstName', 'lastName'],
        },
      });
    if (!availableOffer) {
      return next(createError(404, 'There is no AvailableOffer with this id!'));
    }

    return res.status(200).json(AvailableOffer);
  } catch (err) {
    return next(err);
  }
};

/**
 * DELETE /AvailableOffer/:id
 * Delete AvailableOffer request
 */
export const deleteAvailableOffer = async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const { id: AvailableOfferId } = req.params;

    const availableOffer = await db.models.AvailableOffer.findOne({ where: { id: AvailableOfferId, userId } });
    if (!availableOffer) {
      return next(createError(404, 'There is no AvailableOffer with this id!'));
    }

    await availableOffer.destroy();
    return res.status(204).send();
  } catch (err) {
    return next(err);
  }
};
