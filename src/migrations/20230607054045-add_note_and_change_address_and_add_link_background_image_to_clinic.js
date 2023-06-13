'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Clinics', 'note', { type: Sequelize.TEXT });
    await queryInterface.addColumn('Clinics', 'backgroundImage', { type: Sequelize.STRING });
    await queryInterface.changeColumn('Clinics', 'address', {
      type: Sequelize.TEXT,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Clinics', 'note');
    await queryInterface.removeColumn('Clinics', 'backgroundImage');
    await queryInterface.changeColumn('Clinics', 'address', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  }
};
