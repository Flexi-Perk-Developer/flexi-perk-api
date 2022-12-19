const {
  Model, DataTypes,
} = require('sequelize');

module.exports = (sequelize) => {
  class UserKYC extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserKYC.belongsTo(models.User, { foreignKey: 'userId' });
      UserKYC.hasMany(models.ProofOfIdentificationDocument, { foreignKey: 'userKYCId' });
      UserKYC.hasMany(models.ProofOfResidenceDocument, { foreignKey: 'userKYCId' });
    }
  }
  UserKYC.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    address: DataTypes.STRING,
    idNumber: DataTypes.STRING,
    gender: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'UserKYC',
  });
  return UserKYC;
};
