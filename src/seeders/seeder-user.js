'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'admin@gmail.com',
      password: '123456',
      firstName: 'Khai',
      lastName: 'Trinh',
      address: 'USA',
      phoneNumber: '0123456789',
      gender: 'M',
      image: null,
      roleId: 'R1',
      positionId: null,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});

  }
};
