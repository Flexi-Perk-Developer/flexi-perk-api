import createError from 'http-errors';

import db from '@/database';

/**
 * POST /availableOffers
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
        fields: ['cost', 'description', 'name', 'brandIcon'],
      });

    return res.status(201).json(availableOffer);
  } catch (err) {
    return next(err);
  }
};

/**
 * GET /availableOffers
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
 * GET /availableOffers/:id
 * Get AvailableOfferController by id
 */
export const getAvailableOfferById = async (req, res, next) => {
  try {
    const { id: availableOfferId } = req.params;

    const availableOffer = await db.models.AvailableOffer
      .findOne({
        where: { id: availableOfferId },
      });
    if (!availableOffer) {
      return next(createError(404, 'There is no AvailableOffer with this id!'));
    }

    return res.status(200).json(availableOffer);
  } catch (err) {
    return next(err);
  }
};

/**
 * DELETE /availableOffers/:id
 * Delete AvailableOffer request
 */
export const deleteAvailableOffer = async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const { id: availableOfferId } = req.params;

    const availableOffer = await db.models.AvailableOffer.findOne({ where: { id: availableOfferId, userId } });
    if (!availableOffer) {
      return next(createError(404, 'There is no AvailableOffer with this id!'));
    }

    await availableOffer.destroy();
    return res.status(204).send();
  } catch (err) {
    return next(err);
  }
};
