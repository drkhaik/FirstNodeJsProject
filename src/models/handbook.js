'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Handbook extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // Handbook.hasMany(models.Doctor_Info, { foreignKey: 'HandbookId', as: "HandbookData" }) // 1 n
        }
    };
    Handbook.init({
        name: DataTypes.TEXT,
        description: DataTypes.TEXT, // string -> text
        contentMarkdown: DataTypes.TEXT,
        contentHTML: DataTypes.TEXT,
        image: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Handbook',
    });
    return Handbook;
};