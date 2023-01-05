import createError from 'http-errors';

import db from '@/database';

/**
 * POST /referrals
 * Create referral request
 */
export const createReferral = async (req, res, next) => {
  try {
    const userId = req.user ? req.user.id : null;

    const referralData = {
      ...req.body,
      userId,
    };

    const referral = await db.models.Referral
      .create(referralData, {
        fields: ['userId', 'email', 'name', 'contactNumber'],
      });

    return res.status(201).json(referral);
  } catch (err) {
    return next(err);
  }
};

/**
 * GET /referrals
 * List referrals with pagination
 */
export const getReferrals = async (req, res, next) => {
  try {
    const { page = 1, perPage = 10 } = req.query;
    const offset = page * perPage - perPage;

    const referralListResponse = await db.models.Referral
      .findAndCountAll({
        offset,
        limit: perPage,
        include: {
          model: db.models.User,
          attributes: ['id', 'firstName', 'lastName'],
        },
        order: [['createdAt', 'DESC']],
      });

    const totalPage = Math.ceil(referralListResponse.count / perPage);
    const response = {
      ...referralListResponse, page, totalPage, perPage,
    };
    return res.json(response);
  } catch (err) {
    return next(err);
  }
};

/**
 * GET /referrals/:id
 * Get referralController by id
 */
export const getReferralById = async (req, res, next) => {
  try {
    const { id: referralId } = req.params;

    const referral = await db.models.Referral
      .findOne({
        where: { id: referralId },
        include: {
          model: db.models.User,
          attributes: ['id', 'firstName', 'lastName'],
        },
      });
    if (!referral) {
      return next(createError(404, 'There is no referral with this id!'));
    }

    return res.status(200).json(referral);
  } catch (err) {
    return next(err);
  }
};

/**
 * DELETE /referrals/:id
 * Delete referral request
 */
export const deleteReferral = async (req, res, next) => {
  try {
    const { id: referralId } = req.params;

    const referral = await db.models.Referral.findOne({ where: { id: referralId } });
    if (!referral) {
      return next(createError(404, 'There is no referral with this id!'));
    }

    await referral.destroy();
    return res.status(204).send();
  } catch (err) {
    return next(err);
  }
};
