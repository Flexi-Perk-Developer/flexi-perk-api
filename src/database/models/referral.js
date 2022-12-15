'use strict';
const {
  Model, DataTypes
} = require('sequelize');
module.exports = (sequelize) => {
  class Referral extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Referral.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  Referral.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true, //Can make referal without being logged in
      references: {
        model: 'Users',
        field: 'id',
      }
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    contactNumber: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Referral',
  });
  return Referral;
};