import createError from 'http-errors';

import db from '@/database';

/**
 * POST /proofOfPaymentDocuments
 * Create proofOfPaymentDocument request
 */
export const createProofOfPaymentDocument = async (req, res, next) => {
  try {
    const userId = req.user ? req.user.id : null;

    const proofOfPaymentDocumentFields = {
      ...req.body,
      userId,
    };

    const proofOfPaymentDocument = await db.models.ProofOfPaymentDocument
      .create(proofOfPaymentDocumentFields, {
        fields: ['associatedJobId', 'monthOfIncome', 'amount'],
      });

    return res.status(201).json(proofOfPaymentDocument);
  } catch (err) {
    return next(err);
  }
};

/**
 * GET /proofOfPaymentDocuments
 * List proofOfPaymentDocument with pagination
 */
export const getProofOfPaymentDocument = async (req, res, next) => {
  try {
    const { page = 1, perPage = 10 } = req.query;
    const offset = page * perPage - perPage;

    const proofOfPaymentDocumentListResponse = await db.models.ProofOfPaymentDocument
      .findAndCountAll({
        offset,
        limit: perPage,
        include: {
          model: db.models.User,
          attributes: ['id', 'firstName', 'lastName'],
        },
        order: [['createdAt', 'DESC']],
      });

    const totalPage = Math.ceil(proofOfPaymentDocumentListResponse.count / perPage);
    const response = {
      ...proofOfPaymentDocumentListResponse, page, totalPage, perPage,
    };
    return res.json(response);
  } catch (err) {
    return next(err);
  }
};

/**
 * GET /proofOfPaymentDocuments/:id
 * Get proofOfPaymentDocumentController by id
 */
export const getProofOfPaymentDocumentById = async (req, res, next) => {
  try {
    const { id: proofOfPaymentDocumentId } = req.params;

    const proofOfPaymentDocument = await db.models.ProofOfPaymentDocument
      .findOne({
        where: { id: proofOfPaymentDocumentId },
        include: {
          model: db.models.AssociatedJob,
          attributes: ['description'],
          include: {
            model: db.models.User,
            attributes: ['id', 'firstName', 'lastName'],
          },
        },
      });
    if (!proofOfPaymentDocument) {
      return next(createError(404, 'There is no proofOfPaymentDocument with this id!'));
    }

    return res.status(200).json(proofOfPaymentDocument);
  } catch (err) {
    return next(err);
  }
};

/**
 * DELETE /proofOfPaymentDocuments/:id
 * Delete proofOfPaymentDocument request
 */
export const deleteProofOfPaymentDocument = async (req, res, next) => {
  try {
    const { id: proofOfPaymentDocumentId } = req.params;

    const proofOfPaymentDocument = await db.models.ProofOfPaymentDocument
      .findOne({ where: { id: proofOfPaymentDocumentId } });

    if (!proofOfPaymentDocument) {
      return next(createError(404, 'There is no proofOfPaymentDocument with this id!'));
    }

    await proofOfPaymentDocument.destroy();
    return res.status(204).send();
  } catch (err) {
    return next(err);
  }
};
