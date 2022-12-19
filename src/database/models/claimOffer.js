const {
  Model, DataTypes,
} = require('sequelize');

module.exports = (sequelize) => {
  class ClaimOffer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ClaimOffer.belongsTo(models.RequestedOffer, { foreignKey: 'requestedOfferId' });
    }
  }
  ClaimOffer.init({
    requestedOfferId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'ClaimOffer',
  });
  return ClaimOffer;
};
