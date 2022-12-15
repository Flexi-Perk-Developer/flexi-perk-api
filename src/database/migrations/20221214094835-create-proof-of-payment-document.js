'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ProofOfPaymentDocuments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      paymentDataId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'PaymentData',
          field: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      location: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ProofOfPaymentDocuments');
  }
};