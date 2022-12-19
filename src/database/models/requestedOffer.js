const {
  Model, DataTypes,
} = require('sequelize');

module.exports = (sequelize) => {
  class RequestedOffer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      RequestedOffer.belongsTo(models.User, { foreignKey: 'userId' });
      RequestedOffer.hasMany(models.ClaimOffer, { foreignKey: 'requestedOfferId' });
    }
  }
  RequestedOffer.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    availableOfferId: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'RequestedOffer',
  });
  return RequestedOffer;
};
