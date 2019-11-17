const Sequelize = require('sequelize');

const sequelize = new Sequelize('nodeudemy', 'davidlavieri', 'lavierinode', {
    host: 'localhost',
    dialect: 'postgres',
    omitNull: true,
});

module.exports = sequelize;