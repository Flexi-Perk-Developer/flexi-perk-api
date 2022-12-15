'use strict';
const {
  Model, DataTypes
} = require('sequelize');

module.exports = (sequelize) => {
  class PaymentData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PaymentData.belongsTo(models.AssociatedJob, { foreignKey: 'associatedJobId' });
      PaymentData.hasMany(models.ProofOfPaymentDocument, { foreignKey: 'paymentDataId' });
      
    }
  }
  PaymentData.init({
    associatedJobId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    monthOfIncome: DataTypes.DATE,
    amount: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'PaymentData',
  });
  return PaymentData;
};