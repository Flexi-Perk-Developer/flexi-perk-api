'use strict';
const {
  Model, DataTypes
} = require('sequelize');
module.exports = (sequelize) => {
  class AvailableOffer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AvailableOffer.hasMany(models.RequestedOffer, { foreignKey: 'availableOfferId' });
    }
  }
  AvailableOffer.init({
    description: DataTypes.STRING,
    cost: DataTypes.FLOAT,
    name: DataTypes.STRING,
    brandIcon: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'AvailableOffer',
  });
  return AvailableOffer;
};