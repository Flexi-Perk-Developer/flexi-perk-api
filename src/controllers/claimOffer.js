import createError from 'http-errors';

import db from '@/database';

/**
 * POST /claimOffer
 * Create claimOffer request
 */
export const createClaimOffer = async (req, res, next) => {
  try {
    const { id: userId } = req.user;

    const claimOfferData = {
      ...req.body,
      userId,
    };

    const claimOffer = await db.models.ClaimOffer
      .create(claimOfferData, {
        fields: ['requestOfferId'],
      });

    return res.status(201).json(claimOffer);
  } catch (err) {
    return next(err);
  }
};

/**
 * GET /claimOffers
 * List claimOffers with pagination
 */
export const getClaimOffers = async (req, res, next) => {
  try {
    const { page = 1, perPage = 10 } = req.query;
    const offset = page * perPage - perPage;

    const claimOfferListResponse = await db.models.ClaimOffer
      .findAndCountAll({
        offset,
        limit: perPage,
        include: {
          model: db.models.RequestedOffer,
          include: {
            model: db.models.User,
            attributes: ['id', 'firstName', 'lastName'],
          }
        },
        order: [['createdAt', 'DESC']],
      });

    const totalPage = Math.ceil(claimOfferListResponse.count / perPage);
    const response = {
      ...claimOfferListResponse, page, totalPage, perPage,
    };
    return res.json(response);
  } catch (err) {
    return next(err);
  }
};

/**
 * GET /claimOffer/:id
 * Get claimOfferController by id
 */
export const getClaimOfferById = async (req, res, next) => {
  try {
    const { id: claimOfferId } = req.params;

    const claimOffer = await db.models.ClaimOffer
      .findOne({
        where: { id: claimOfferId },
        include: {
          model: db.models.RequestedOffer,
          include: {
            model: db.models.User,
            attributes: ['id', 'firstName', 'lastName'],
          }
        },
      });
    if (!claimOffer) {
      return next(createError(404, 'There is no claimOffer with this id!'));
    }

    return res.status(200).json(claimOffer);
  } catch (err) {
    return next(err);
  }
};

/**
 * DELETE /claimOffer/:id
 * Delete claimOffer request
 */
export const deleteClaimOffer = async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const { id: claimOfferId } = req.params;

    //TODO: Fix delete lookup

    const claimOffer = await db.models.ClaimOffer.findOne({ where: { id: claimOfferId, userId } });
    if (!claimOffer) {
      return next(createError(404, 'There is no claimOffer with this id!'));
    }

    await claimOffer.destroy();
    return res.status(204).send();
  } catch (err) {
    return next(err);
  }
};
