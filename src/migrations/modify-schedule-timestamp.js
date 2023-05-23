'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn('Schedules', 'date', {
                type: Sequelize.STRING,
                allowNull: true,
            })
        ])
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn('Schedules', 'date', {
                type: Sequelize.DATE,
                allowNull: true,
            })
        ])
    }
};
