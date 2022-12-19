const {
  Model, DataTypes,
} = require('sequelize');

module.exports = (sequelize) => {
  class ProofOfResidenceDocument extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProofOfResidenceDocument.belongsTo(models.UserKYC, { foreignKey: 'userKYCId' });
    }
  }
  ProofOfResidenceDocument.init({
    userKYCId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    location: DataTypes.STRING,
    description: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'ProofOfResidenceDocument',
  });
  return ProofOfResidenceDocument;
};
