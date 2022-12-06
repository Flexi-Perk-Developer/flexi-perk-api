import { DataTypes, Model } from 'sequelize';

export default function (sequelize) {
  class AssociatedJob extends Model {

    static associate(models) {
      AssociatedJob.belongsTo(models.user, { foreignKey: 'userId' });
    }
  }

  AssociatedJob.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(140),
      allowNull: false,
    }
  }, {
    modelName: 'associatedJob',
    sequelize,
  });

  return AssociatedJob;
}
