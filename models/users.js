const Sequelize = require('sequelize');
const db = require('../config/database');


const User = db.define('users', {
    name: {
        type: Sequelize.STRING
    },
    age: {
        type: Sequelize.INTEGER
    },
    job: {
        type: Sequelize.STRING
    }
})

module.exports = User;