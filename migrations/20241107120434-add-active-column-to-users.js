'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const tableDescription = await queryInterface.describeTable('Users');
    if(!tableDescription.active) {
      await queryInterface.addColumn('Users', 'active', {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false
      });
    }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    const tableDescription = await queryInterface.describeTable('Users');
    if(tableDescription.active) {
      await queryInterface.removeColumn('Users', 'active');
    }
  }
};
