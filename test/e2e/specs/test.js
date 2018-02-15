// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'site loads': function (browser) {
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .waitForElementVisible('#container', 1000)
      .waitForElementVisible('.no-recipes', 1000)
      .waitForElementNotPresent('#filter', 1000)

  },

  'add a recipe': function (browser) {
    browser
      .click('#recipe-add')
      .waitForElementVisible('h2', 1000)
      .click('#save')
      .waitForElementVisible('.noty_body', 1000)
      .assert.containsText('.noty_body', 'Recipe name cannot be null.')
      .click('.noty_body')

      .setValue('#recipe-name', 'Test')
      .setValue('#recipe-category', 'Dip')
      .setValue('#recipe-prep', '5')
      .setValue('#recipe-cook', '15')
      .setValue('#recipe-description', 'A description.')
      .setValue('.ingredient .name', 'Thing One')
      .setValue('.ingredient .amount', '1')
      .setValue('.ingredient .measure', 'Cup')
      .setValue('#recipe-instructions', 'Make the thing.')
      .click('#save')
      .waitForElementVisible('.noty_type__success', 1000)
      .waitForElementVisible('#recipes', 1000)
  },

  'view a recipe': function (browser) {
    browser
      .click('.card')
      .assert.urlContains('/recipe/1')
  },

  'edit a recipe': function (browser) {
    browser
      .click('#edit')
      .assert.urlContains('/recipe-edit/1')

      .click('#cancel')
      .assert.urlContains('/recipe/1')
  },

  'delete a recipe': function (browser) {
    browser
      .click('#delete')
      .waitForElementVisible('#delete-yes', 3000)
      .click('#delete-yes')
      .waitForElementVisible('.noty_type__success', 1000)
      .waitForElementNotPresent('h4', 1000)
      .assert.urlEquals('http://localhost:8080/')

      .end()
  }
}
