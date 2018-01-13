import RecipeList from '@/components/RecipeList'

describe('RecipeList', () => {
  it('should be named "recipe-list"', () => {
    expect(RecipeList.name).to.equal('recipe-list')
  })

  it('should have a recipes array', () => {
    const data = RecipeList.data()

    expect(data.recipes).to.be.an('array')
  })

  it('should have a RecipeCard component', () => {
    expect(RecipeList.components.RecipeCard).to.be.an('object')
  })
})
