export const up = (queryInterface, Sequelize) => Promise.all([
  queryInterface.addColumn('associatedJobs', 'payment1', {
    allowNull: true,
    type: Sequelize.INTEGER,
  }),
  queryInterface.addColumn('associatedJobs', 'payment2', {
    allowNull: true,
    type: Sequelize.INTEGER,
  }),
  queryInterface.addColumn('associatedJobs', 'payment3', {
    allowNull: true,
    type: Sequelize.INTEGER,
  })
]);

export const down = (queryInterface) => Promise.all([
  queryInterface.removeColumn('associatedJobs', 'payment1'),
  queryInterface.removeColumn('associatedJobs', 'payment2'),
  queryInterface.removeColumn('associatedJobs', 'payment3')
]);