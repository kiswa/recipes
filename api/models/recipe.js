'use strict'

module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('recipe', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    },
    prepTime: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: { isNumeric: true }
    },
    cookTime: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: { isNumeric: true }
    },
    description: DataTypes.TEXT,
    instructions: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: { notEmpty: true }
    },
    image: DataTypes.TEXT
  })

  Recipe.associate = (models) => {
    Recipe.Ingredients = Recipe.hasMany(models.ingredient)
  }

  return Recipe
}
