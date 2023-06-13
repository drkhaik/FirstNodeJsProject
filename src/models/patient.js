'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Patient extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Patient.belongsTo(models.Allcode, { foreignKey: 'gender', targetKey: 'keyMap', as: 'genderPatient' })
            //   Patient.belongsTo(models.Allcode, { foreignKey: 'positionId', targetKey: 'keyMap', as: 'positionData' })
            //   Patient.hasOne(models.Detail_Section, { foreignKey: 'doctorId' })
            //   Patient.hasOne(models.Doctor_Info, { foreignKey: 'doctorId' })
            Patient.hasMany(models.Booking, { foreignKey: 'patientId', as: "patientData" }) // 1 n
        }
    };
    Patient.init({
        email: DataTypes.STRING,
        fullName: DataTypes.STRING,
        address: DataTypes.STRING,
        phoneNumber: DataTypes.STRING,
        gender: DataTypes.STRING,
        birthday: DataTypes.STRING,
        reason: DataTypes.TEXT,
    }, {
        sequelize,
        modelName: 'Patient',
    });
    return Patient;
};