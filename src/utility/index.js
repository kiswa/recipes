import Noty from 'noty'

export const convertTime = function (minutes) {
  let hours = 0
  let outro = ' min'

  if (minutes >= 60) {
    hours = parseInt(minutes / 60)
    minutes = parseInt(minutes % 60)
  }

  if (minutes > 1) {
    outro += 's'
  }

  let intro = hours > 0
    ? hours + (hours > 1
      ? ' hours' + (minutes > 0 ? ', ' : '')
      : ' hour' + (minutes > 0 ? ', ' : ''))
    : ''

  return intro + (minutes > 0 ? minutes + outro : '')
}

export const showNoty = function (text, type = 'error') {
  new Noty({
    text,
    type,
    timeout: 3000,
    layout: 'topCenter'
  }).show()
}

export const RECIPE_TYPES = [
  'Appetizer',
  'Beverage',
  'Dessert',
  'Dip',
  'Main Dish',
  'Sauce',
  'Side Dish',
  'Soup'
]
