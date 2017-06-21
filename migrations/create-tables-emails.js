'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('emails', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        unique: true,
        allowNull: false,
        autoIncrement: true
      },
      message_id: {
        type: Sequelize.STRING
      },
      transaction_id: {
        type: Sequelize.STRING
      },
      email_from: {
        type: Sequelize.STRING
      },
      email_to: {
        type: Sequelize.STRING
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('emails');
  }
};
