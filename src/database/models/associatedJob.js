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
    },
    // TODO: Normalize out into monthly payment data per associated Job
    payment1: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    payment2: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    payment3: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    modelName: 'associatedJob',
    sequelize,
  });

  return AssociatedJob;
}
