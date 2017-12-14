
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
import './BatchesContainer.css'

const styles = {
root: {
   display: 'flex',
   flexWrap: 'wrap',
   justifyContent: 'space-around',
 },
 gridTile: {
   width: 400,
   heigth: 100,
   overflowY: 'auto',
 },
};

export class BatchesContainer extends PureComponent {
  static propTypes = {
  signedIn: PropTypes.bool,
 }

  componentWillMount()
    { this.props.fetchBatches() }

      linkToBatch = batchId => event => this.props.push(`batches/${batchId}`)


  render() {




    return(

    <div>

       <GridList cellHeight={100} style={styles.gridList}>
       {this.props.batches.map((batch) => (

         <GridTile style={styles.gridTile}
         key={batch._id}
         title= {"Batch  #" + batch.batchNumber}
         subtitle={<span>{batch.startDate + " ~ " + batch.endDate}</span>}
         onClick={this.linkToBatch(batch._id)}
       >

         </GridTile>
      ))}
      </GridList>
      <div className="editor" >
      <BatchEditor batchId />
      </div>
      </div>


    )
  }
}

const mapStateToProps = ({ batches, currentUser }) => ({ batches,
  signedIn: !!currentUser && !!currentUser._id, })
const mapDispatchToProps = { fetchBatches, push }

export default connect(mapStateToProps, mapDispatchToProps)(BatchesContainer)
