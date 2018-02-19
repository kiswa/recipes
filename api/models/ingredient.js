'use strict'

module.exports = (sequelize, DataTypes) => {
  const Ingredient = sequelize.define('ingredient', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: { notEmpty: true }
    },
    measure: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    }
  })

  Ingredient.associate = (models) => {
    Ingredient.belongsTo(models.recipe, { onDelete: 'CASCADE' })
  }

  return Ingredient
}
