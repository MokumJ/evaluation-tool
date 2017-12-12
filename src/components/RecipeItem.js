import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import LikeButton from '../components/LikeButton'
import StudentCategory from './StudentCategory'
import Title from '../components/Title'

  const PLACEHOLDER = 'http://via.placeholder.com/500x180?text=No%20Image'

  class StudentItem extends PureComponent {
    static propTypes = {
      title: PropTypes.string.isRequired,
      summary: PropTypes.string.isRequired,
      vegan: PropTypes.bool,
      vegetarian: PropTypes.bool,
      pescatarian: PropTypes.bool,
    }

    render() {
      const { title, summary, vegan, vegetarian, pescatarian, photo } = this.props
      const categories = { vegan, vegetarian, pescatarian }

      return(
        <article className="StudentItem">
          <header>
            <div
              className="cover"
              style={{ backgroundImage: `url(${photo || PLACEHOLDER })` }} />
            <Title content={title} className="level-2" />
            <ul className="categories">
              <StudentCategory { ...categories } />
            </ul>
          </header>

          <div>
            <p>{ summary }</p>
          </div>
          <footer>
            <LikeButton />
          </footer>
        </article>
      )
    }
  }

  export default StudentItem
