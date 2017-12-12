// src/students/StudentsContainer.js
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { fetch as fetchBatches } from '../actions/batches'
import Title from '../components/Title'

import BatchEditor from './BatchEditor'
import './BatchContainer.css'

export class BatchesContainer extends PureComponent {
  static propTypes = {
  signedIn: PropTypes.bool,
 }

  componentWillMount()
    { this.props.fetchBatches() }
      goToBatch = batchId => event => this.props.push(`/batches/${batchId}`)
  render() {
    if (!this.props.signedIn) return <SignIn />

    if (!batches) { return null }

    return(
      <div className="StudentsContainer">
        <BatchEditor />

        <header>
          <Title content="All Batches" />
        </header>

        <main>
          {batches.map(this.renderBatches)}
        </main>
      </div>
    )
  }
}

const mapStateToProps = ({ batches }) => ({ students })
const mapDispatchToProps = { fetchBatches, push }


export default connect(mapStateToProps, mapDispatchToProps)(BatchesContainer)
