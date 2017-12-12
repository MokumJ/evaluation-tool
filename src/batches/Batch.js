import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Title from '../components/Title'
import './Batch.css'
import '../students/StudentEditor'

const PLACEHOLDER = 'http://via.placeholder.com/500x180?text=No%20Image'

const studentShape = PropTypes.shape({
  evaluations: PropTypes.arrayOf(PropTypes.object),
  name: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  batchNo: PropTypes.string.isRequired
})

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
      const { batchNo } = this.props

        //pickRandom Student function
  }

  render() {
    const { batch } = this.props

    this.props.fetchOneBatch(batchId)


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
            <Title content={batchNo._id} className="level-2" />
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

    const mapStateToProps = ({ batch }


  export default connect(mapStateToProps, { fetchOneBatch })(Batch)
