'use strict';
const {
  Model, DataTypes
} = require('sequelize');
module.exports = (sequelize) => {
  class ProofOfPaymentDocument extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProofOfPaymentDocument.belongsTo(models.AssociatedJob, { foreignKey: 'paymentDataId' });
    }
  }
  ProofOfPaymentDocument.init({
    paymentDataId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    location: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ProofOfPaymentDocument',
  });
  return ProofOfPaymentDocument;
};