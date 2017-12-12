
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

export class Batch extends PureComponent {
  static propTypes = {
    fetchOneBatch: PropTypes.func.isRequired,
    batch: PropTypes.shape({
      batchNo: PropTypes.number,
      students: PropTypes.arrayOf(studentShape),
      startDate: PropTypes.string.isRequired,
      endDate: PropTypes.string.isRequired,
      pickStudent: PropTypes.array,
      })
  }
    componentWillMount() {
      const { batchNo} = this.props

        //pickRandom Student function
  }

  render() {
    const { batch } = this.props



    return(
      // student list
       //  link to student name , photo color.
        //
      <article className="StudentItem">
        <header>
          <div
            className="cover"
            style={{ backgroundImage: `url(${photo || PLACEHOLDER })` }} />
          <Link to={`/students/${_id}`}>
            <Title content={title} className="level-2" />
          </Link>
          <ul className="categories">

          </ul>
        </header>
        <StudentEditor batchNo= { batch._id}/>
        <div>
          <p>{ summary }</p>
        </div>
        <footer>

        </footer>
      </article>
    )
  }
}

const mapDispatchToProps = { toggleLike: likeStudent }

export default connect(null, mapDispatchToProps)(StudentItem)
