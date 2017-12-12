import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetch as fetchStudents } from '../actions/students'
import Title from '../components/Title'

export class StudentPage extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
  }

  componentWillMount() {
    this.props.fetchStudents()
  }

  render() {
    const { title } = this.props

    if (!title) return null

    return(
      <div className="student page">
        <Title content={ title } />
      </div>
    )
  }
}

const mapStateToProps = ({ students }, { match }) => {
  const student = students.reduce((prev, next) => {
    if (next._id === match.params.studentId) {
      return next
    }
    return prev
  }, {})

  return {
    ...student
  }
}

export default connect(mapStateToProps, { fetchStudents })(StudentPage)
