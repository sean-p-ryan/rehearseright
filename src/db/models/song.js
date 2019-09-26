'use strict';
module.exports = (sequelize, DataTypes) => {
    var Song = sequelize.define('Song', {
        artist: DataTypes.STRING,
        notes: DataTypes.STRING,
        title: DataTypes.STRING,
        userId: {
            type: DataTypes.INTEGER,
            onDelete: "CASCADE",
            references: {
                model: "Users",
                key: "id",
                as: "userId"
            }
        }
    }, {});
    Song.associate = function(models) {
        // associations can be defined here
        Song.belongsTo(models.User, {
            foreignKey: "userId",
            onDelete: "CASCADE",
        });
    };
    // Song.addScope("user", (userId) => {
    //     console.log("In song model scope")
    //     return {
    //         include: [{
    //             model: models.User,
    //             where: { userId: userId }
    //         }],
    //     }
    // });
    return Song;
};