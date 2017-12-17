// src/routes.js
import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import SignIn from './users/SignIn'
import SignUp from './users/SignUp'
import BatchesContainer from './batches/BatchesContainer'
import Batch from './batches/Batch'
import StudentPage from './students/StudentPage'


export default class Routes extends Component {
  render() {
    return (
      <div>
        <Route exact path="/"  component={BatchesContainer} />
        <Route path="/batches/:batchId" component={Batch} />
        <Route path="/students-path/:batchId/:studentId" component={StudentPage}/>
        <Route path="/sign-in" component={SignIn} />
        <Route path="/sign-up" component={SignUp} />
      </div>
    )
  }
}
