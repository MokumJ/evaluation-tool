// src/students/StudentItem.js
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import likeStudent from '../actions/students/like'
import LikeButton from '../components/LikeButton'
import StudentCategory from './StudentCategory'
import Title from '../components/Title'
import './StudentItem.css'

const PLACEHOLDER = 'http://via.placeholder.com/500x180?text=No%20Image'

class StudentItem extends PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    vegan: PropTypes.bool,
    vegetarian: PropTypes.bool,
    pescatarian: PropTypes.bool,
  }

  toggleLike = () => {
    console.log('TOGGLE LIKE')
    this.props.toggleLike(this.props._id)
  }

  render() {
    const { _id, title, summary, vegan, vegetarian, pescatarian, photo, liked } = this.props
    const categories = { vegan, vegetarian, pescatarian }

    return(
      <article className="StudentItem">
        <header>
          <div
            className="cover"
            style={{ backgroundImage: `url(${photo || PLACEHOLDER })` }} />
          <Link to={`/students/${_id}`}>
            <Title content={title} className="level-2" />
          </Link>
          <ul className="categories">
            <StudentCategory { ...categories } />
          </ul>
        </header>

        <div>
          <p>{ summary }</p>
        </div>
        <footer>
          <LikeButton onChange={this.toggleLike} liked={liked} />
        </footer>
      </article>
    )
  }
}

const mapDispatchToProps = { toggleLike: likeStudent }

export default connect(null, mapDispatchToProps)(StudentItem)
