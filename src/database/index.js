import { Sequelize } from 'sequelize';

import * as config from '@/config/sequelize';

// import models
import userModel from './models/user';
import tweetModel from './models/tweet';
import associatedJobModel from './models/associatedJob';
import availableOffer from './models/availableOffer';
import claimOffer from './models/claimOffer';
import paymentData from './models/paymentData';
import proofOfIdentificationDocument from './models/proofOfIdentificationDocument';
import proofOfPaymentDocument from './models/proofOfPaymentDocument';
import proofOfResidenceDocument from './models/proofOfResidenceDocument';
import referral from './models/referral';
import requestedOffer from './models/requestedOffer';
import userkyc from './models/userkyc';

// Configuration
const env = process.env.NODE_ENV;
const sequelizeConfig = config[env];

// Create sequelize instance
const sequelize = new Sequelize(sequelizeConfig || config.development);

// Import all model files
const modelDefiners = [
  userModel,
  tweetModel,
  associatedJobModel,
  userkyc,
  referral,
  availableOffer,
  requestedOffer,
  claimOffer,
  paymentData,
  proofOfIdentificationDocument,
  proofOfPaymentDocument,
  proofOfResidenceDocument,
];

// eslint-disable-next-line no-restricted-syntax
for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}

// Associations
Object.keys(sequelize.models)
  .forEach((modelName) => {
    if (sequelize.models[modelName].associate) {
      sequelize.models[modelName].associate(sequelize.models);
    }
  });

export default sequelize;
