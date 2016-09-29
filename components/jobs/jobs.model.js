'use strict';

module.exports = (sequelize, DataTypes) =>
    sequelize.define('jobs', {
        job_id: {
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
        company: {
            type: DataTypes.STRING,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING(512),
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
