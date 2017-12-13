
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { fetchBatches } from '../actions/batches/'
import Title from '../components/Title'
import SignIn from '../users/SignIn'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import BatchEditor from './BatchEditor'
//import Batch from './Batch'
import {GridList, GridTile} from 'material-ui/GridList';
import './BatchContainer.css'

const styles = {
root: {
   display: 'flex',
   flexWrap: 'wrap',
   justifyContent: 'space-around',
 },
 gridList: {
   width: 900,
   overflowY: 'auto',
 },
};

export class BatchesContainer extends PureComponent {
  static propTypes = {
  signedIn: PropTypes.bool,
 }

  componentWillMount()
    { this.props.fetchBatches() }

      linkToBatch = batchId => event => this.props.push(`/batches/${batchId}`)


  render() {


    if (!this.props.signedIn) return <SignIn />

    return(

    <div className="StudentsContainer">

       <GridList cellHeight={100} style={styles.gridList}>
      {this.props.batches.map((batch) => (
       <GridTile
         key={batch._id}
         title= {"Batch  #" + batch.batchNumber}
         subtitle={<span>{batch.startDate + " ~ " + batch.endDate}</span>}
         onClick={this.linkToBatch(batch._id)}
       >
       </GridTile>
      ))}
      </GridList>
      <BatchEditor batchId />
      </div>

    )
  }
}

const mapStateToProps = ({ batches, currentUser }) => ({ batches,
  signedIn: !!currentUser && !!currentUser._id, })
const mapDispatchToProps = { fetchBatches, push }

export default connect(mapStateToProps, mapDispatchToProps)(BatchesContainer)
