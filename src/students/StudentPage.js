import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchOneStudent } from '../actions/students'
import { push } from 'react-router-redux'
import StudentCategory from './StudentCategory'
import Title from '../components/Title'
import './StudentItem.css'

const PLACEHOLDER = 'http://via.placeholder.com/500x180?text=No%20Image'
class StudentPage extends PureComponent {

  componentWillMount() {
    const { student, fetchOneStudent } = this.props
    const { studentId } = this.props.match.params

    if (!student) { fetchOneStudent(studentId) }

  }

    state = {}

    submitForm(event) {
      event.preventDefault()

      const { student } = this.props
       const evaluation = {
         color: this.state.value,
         date: this.refs.date.getValue(),
         context: this.refs.context.getValue()
        }
        backToBatch(){
          const { studentId } = this.props.match.params
          const currentStudent = this.props.students.filter(student => student._id === studentId)
          const daStudent = thisStudent[0]
          const batchId = Student.batch_id
          this.props.push(`/batch/${batchId}`)
        }
    }

      // student list
       //  link to student name , photo color.
        //
      <article className="StudentItem">
        <header>
          <div
            className="cover"
            style={{ backgroundImage: `url(${picture || PLACEHOLDER })` }} />
          <Link to={`/students/${_id}`}>
            <Title content={title} className="level-2" />
          </Link>
          <ul className="categories">

          </ul>
        </header>
        <StudentEditor batchId= { batch._id}/>
        <div>

          <p>{ context }</p>
        </div>
        <footer>

        </footer>
      </article>
    )
  }
}

const mapStateToProps = ({ batches, students, evaluations }) => ({ batches, students, evaluations })

export default connect(null, mapDispatchToProps)(StudentItem)
