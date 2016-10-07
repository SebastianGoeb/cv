'use strict';

module.exports = (sequelize, DataTypes) =>
    sequelize.define('educations', {
        education_id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: 'users',
                key: 'user_id',
            }
        },
        institution: {
            type: DataTypes.STRING,
            allowNull: false
        },
        degree: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date_specificity: {
            type: DataTypes.STRING,
            allowNull: false
        },
        from_date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        to_date: {
            type: DataTypes.DATEONLY
        }
    });
