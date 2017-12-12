// src/recipes/RecipesContainer.js
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { fetch as fetchRecipes } from '../actions/recipes'
import Title from '../components/Title'
import RecipeItem from './RecipeItem'
import RecipeEditor from './RecipeEditor'
import './RecipesContainer.css'

class RecipesContainer extends PureComponent {
  componentWillMount() {
    this.props.dispatch(fetchRecipes())
  }

  renderRecipe(recipe, index) {
    return (
      <RecipeItem key={index} {...recipe} />
    )
  }

  render() {
    const { recipes } = this.props

    if (!recipes) { return null }

    return(
      <div className="RecipesContainer">
        <RecipeEditor />

        <header>
          <Title content="All Recipes" />
        </header>

        <main>
          {recipes.map(this.renderRecipe)}
        </main>
      </div>
    )
  }
}

const mapStateToProps = ({ recipes }) => ({ recipes })

export default connect(mapStateToProps)(RecipesContainer)
