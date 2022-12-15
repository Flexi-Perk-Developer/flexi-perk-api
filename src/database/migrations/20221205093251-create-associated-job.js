export const up = (queryInterface, Sequelize) => queryInterface.createTable('AssociatedJobs', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  userId: {
    allowNull: false,
    type: Sequelize.INTEGER,
    references: {
      model: 'Users',
      field: 'id',
    },
    onDelete: 'cascade',
    onUpdate: 'cascade',
  },
  description: {
    allowNull: false,
    type: Sequelize.STRING(140),
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE,
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE,
  },
  deletedAt: {
    allowNull: true,
    type: Sequelize.DATE,
  },
});

export const down = (queryInterface) => queryInterface.dropTable('AssociatedJobs');
