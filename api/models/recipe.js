'use strict'

module.exports = (sequelize, DataTypes) => {
  let Recipe = sequelize.define('Recipe', {
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    prepTime: DataTypes.FLOAT,
    cookTime: DataTypes.FLOAT,
    description: DataTypes.TEXT,
    instructions: DataTypes.TEXT,
    image: DataTypes.TEXT
  })

  Recipe.associate = (models) => {
    Recipe.hasMany(models.Ingredient)
  }

  return Recipe
}
