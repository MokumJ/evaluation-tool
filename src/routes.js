// src/routes.js
import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import StudentsContainer from './students/StudentsContainer'
import StudentPage from './students/StudentPage'
import SignIn from './users/SignIn'
import SignUp from './users/SignUp'

export default class Routes extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={StudentsContainer} />
        <Route path="/students/:studentId" component={StudentPage} />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/sign-up" component={SignUp} />
      </div>
    )
  }
}
