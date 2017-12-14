import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchOneStudent } from '../actions/students'
import { push } from 'react-router-redux'
import StudentCategory from './StudentCategory'
import Title from '../components/Title'
import './StudentItem.css'
import RaisedButton from 'material-ui/RaisedButton'

const PLACEHOLDER = 'http://via.placeholder.com/500x180?text=No%20Image'
class StudentPage extends PureComponent {

  componentWillMount() {
    const { student, fetchOneStudent } = this.props
    const { studentId } = this.props.match.params
    const currentStudent = this.props.students.filter(student => student._id === studentId)
    const profileStudent = currentStudent[0]
    const batchId = profileStudent.batch_id

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
        if (evaluation.color != null) {
        var updatedEvaluations = this.props.student.evaluations
        updatedEvaluations.push(evaluation)}

        const updatedStudent = {
         name: this.refs.name.getValue(),
         picture: this.refs.photo.getValue(),
         evaluations: updatedEvaluations
     }

     this.props.updateStudent(updatedStudent, student._id)
     this.props.push(`/students/${student._id}`)
    }
    handleChange = (value) => { this.setState({value}) }


    backToBatch = profileStudent => event => this.props.push(`/batch/${batchId}`)


  render() {
    const  { student } = this.props
    const { studentId } = this.props.match.params
    const currentStudent = this.props.students.filter(student => student._id === studentId)
    const profileStudent = currentStudent[0]



  return (

      <article className="StudentItem">
        <header>
          <Title content={profileStudent.name} className="level-2" />
          <div

            className="img" style={{backgroundImage:"url("+ profileStudent.picture +")" }}/>

        </header>

        <div>

          <p>{ profileStudent.context }</p>
        </div>
        <footer>
        <RaisedButton
            onClick={ this.backToBatch.bind(this) }
            label="Back"
            primary={true} />
        </footer>
      </article>

    )
  }
}

const mapStateToProps = ({ batches, students, evaluations }) => ({ batches, students, evaluations })

export default connect(mapStateToProps, { fetchOneStudent, updateStudent, push })(StudentPage)
