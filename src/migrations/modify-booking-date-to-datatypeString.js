'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn('Bookings', 'date', {
                type: Sequelize.STRING,
                allowNull: true,
            }),
            queryInterface.changeColumn('Bookings', 'doctorId', {
                type: Sequelize.INTEGER,
                allowNull: true,
            }),
            queryInterface.changeColumn('Bookings', 'patientId', {
                type: Sequelize.INTEGER,
                allowNull: true,
            })
        ])
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn('Bookings', 'date', {
                type: Sequelize.DATE,
                allowNull: true,
            }),
            queryInterface.changeColumn('Bookings', 'doctorId', {
                type: Sequelize.STRING,
                allowNull: true,
            }),
            queryInterface.changeColumn('Bookings', 'patientId', {
                type: Sequelize.STRING,
                allowNull: true,
            })
        ])
    }
};
