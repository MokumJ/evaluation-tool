import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
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
  batchId: PropTypes.string.isRequired
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
      const { batchId } = this.props
      this.props.fetchOneBatch(batchId)
        //pickRandom Student function
  }

  render() {
    const { batch } = this.props



    if (!batch) return null

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
            <Title content={batchId._id} className="level-2" />
          </Link>

        </header>
        <StudentEditor batchId= { batch._id}/>
        <div>

        </div>
        <footer>

        </footer>
      </article>
    )
  }
}

  const mapStateToProps = ({ batches }


  export default connect(mapStateToProps, { fetchOneBatch, push })(Batch)
