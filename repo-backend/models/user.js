'use strict';
const {
  Model
} = require('sequelize');
const { passwordHash } = require("../helper/bcrypt")
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Username required"
        },
        notEmpty: {
          msg: "Username required"
        }
      }
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Email has already been taken"
      },
      validate: {
        notNull: {
          msg: "Email required"
        },
        notEmpty: {
          msg: "Email required"
        }
      }
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password required"
        },
        notEmpty: {
          msg: "Password required"
        },
        len: {
          args: 5,
          msg: "Password minimum 5 characters"
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "Staff"
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate(el => {
    el.password = passwordHash(el.password)
  })
  return User;
};