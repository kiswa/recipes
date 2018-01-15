'use strict'

module.exports = (sequelize, DataTypes) => {
  let Recipe = sequelize.define('Recipe', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    prepTime: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: { isNumeric: true  }
    },
    cookTime: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: { isNumeric: true }
    },
    description: DataTypes.TEXT,
    instructions: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    image: DataTypes.TEXT
  })

  Recipe.associate = (models) => {
    Recipe.hasMany(models.Ingredient)
  }

  return Recipe
}
