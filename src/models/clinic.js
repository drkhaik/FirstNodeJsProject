'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Clinic extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Clinic.hasMany(models.Doctor_Info, { foreignKey: 'clinicId', as: "clinicData" }) // 1 n
        }
    };
    Clinic.init({
        name: DataTypes.STRING,
        address: DataTypes.TEXT, // string -> text
        note: DataTypes.TEXT,
        backgroundImage: DataTypes.STRING,
        descriptionMarkdown: DataTypes.TEXT,
        descriptionHTML: DataTypes.TEXT,
        strength_equipmentMarkdown: DataTypes.TEXT,
        strength_equipmentHTML: DataTypes.TEXT,
        image: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Clinic',
    });
    return Clinic;
};