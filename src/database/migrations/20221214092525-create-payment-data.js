/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PaymentData', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      associatedJobId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'AssociatedJobs',
          field: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      monthOfIncome: {
        type: Sequelize.DATE,
      },
      amount: {
        type: Sequelize.FLOAT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('PaymentData');
  },
};
