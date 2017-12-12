// src/students/StudentsContainer.js
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { fetch as fetchStudents } from '../actions/students'
import Title from '../components/Title'
import StudentItem from './StudentItem'
import StudentEditor from './StudentEditor'
import './StudentsContainer.css'

class StudentsContainer extends PureComponent {
  componentWillMount() {
    this.props.dispatch(fetchStudents())
  }

  renderStudent(student, index) {
    return (
      <StudentItem key={index} {...student} />
    )
  }

  render() {
    const { students } = this.props

    if (!students) { return null }

    return(
      <div className="StudentsContainer">
        <StudentEditor />

        <header>
          <Title content="All Students" />
        </header>

        <main>
          {students.map(this.renderStudent)}
        </main>
      </div>
    )
  }
}

const mapStateToProps = ({ students }) => ({ students })

export default connect(mapStateToProps)(StudentsContainer)
