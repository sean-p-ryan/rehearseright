'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn(
            "Users",
            "song_number",
            Sequelize.INTEGER
        )
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn(
            "Users",
            "song_number"
        )
    }
};