// src/routes.js
import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import StudentsContainer from './students/StudentContainer'

import SignIn from './users/SignIn'
import SignUp from './users/SignUp'
import BatchesContainer from './batches/BatchesContainer'
import Batch from './batches/Batch'

export default class Routes extends Component {
  render() {
    return (
      <div>
        <Route exact path="/"  component={BatchesContainer} />
        <Route path="/batches/:batchId" component={Batch} />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/sign-up" component={SignUp} />
      </div>
    )
  }
}
