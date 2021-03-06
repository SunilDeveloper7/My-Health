'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class articles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      // define association here
    }
  };
  articles.init({
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    url: DataTypes.STRING,
    formresult: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'articles',
  });
  return articles;
};