const Sequelize = require('sequelize');

module.exports = sequelize => sequelize.define('users', {
    user_name: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING
    },
    password_hash: {
        type: Sequelize.STRING
    },

}, {
    timestamps: false
});
