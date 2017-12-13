
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { fetchBatches } from '../actions/batches'
import Title from '../components/Title'
import SignIn from '../users/SignIn'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import BatchEditor from './BatchEditor'
import './BatchContainer.css'

export class BatchesContainer extends PureComponent {
  static propTypes = {
  signedIn: PropTypes.bool,
 }

  componentWillMount()
{ this.props.fetchBatches() }

      linkToBatch = batchId => event => this.props.push(`/batches/${batchId}`)

      renderBatches(batch, index) {
        return (
          <batch key={index} {...batch} />
        )
      }
  render() {
    if (!this.props.signedIn) return <SignIn />

    return(
      <div className="StudentsContainer">
        <BatchEditor />

        <header>
          <Title content="All Batches" />
        </header>

        <main>
          {this.props.batches.map(this.renderBatches)}

        </main>
      </div>
    )
  }
}

const mapStateToProps = ({ batches, currentUser }) => ({ batches,
  signedIn: !!currentUser && !!currentUser._id, })
const mapDispatchToProps = { fetchBatches, push }


export default connect(mapStateToProps, mapDispatchToProps)(BatchesContainer)
