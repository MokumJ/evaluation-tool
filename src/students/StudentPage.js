import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchOneStudent } from '../actions/students'
import { updateStudent } from '../actions/students'
import { push } from 'react-router-redux'
import Evaluation from './Evaluation'
import Title from '../components/Title'
import './StudentPage.css'
import RaisedButton from 'material-ui/RaisedButton'

const PLACEHOLDER = 'http://via.placeholder.com/500x180?text=No%20Image'

class StudentPage extends PureComponent {

  componentWillMount() {
    const { student, fetchOneStudent } = this.props
    const { studentId } = this.props.match.params
    if (!student) { fetchOneStudent(studentId) }
  }


  backToBatch = batchId => event => this.props.push(`/batch/${batchId}`)

  render() {
   const  { student } = this.props


  return (

      <article className="StudentItem">
        <header>
          <Title content={ student.name } className="level-2" />
          <div className="colors">
          {student.evaluations.map(stud =>
           <div key={stud._id} className={stud.color}></div>)}
       </div>
          <div
            className="cover"
             style={{backgroundImage:`url(${ student.picture })`}}/>

        </header>

        <div>

          <p>{ student.remark }</p>
        </div>
        <div>
         <Evaluation studentId={student._id} batchId={student.batchId}/>
       </div>
        <footer>
        <RaisedButton
            onClick={ this.backToBatch(this.props.student.batchId) }
            label="Back"
            primary={true} />
        </footer>
      </article>

    )
  }
}

  const mapStateToProps = ({ students }, { match }) => {
   const student = students.filter((s) => (s._id === match.params.studentId))[0]
  return {
    student
  }
}

export default connect(mapStateToProps, { fetchOneStudent, push })(StudentPage)
