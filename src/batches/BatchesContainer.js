
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
    gridList: {
      width: 900,
      heigth: 300,
      overflowY: 'auto',

  },
    titleStyle: {
      fontStyle: 'helvetica',

 },
    gridTile: {
      backgroundColor: '#B71C1C',
      marginTop: 20,
    }
};

export class BatchesContainer extends PureComponent {
  static propTypes = {
  signedIn: PropTypes.bool,
 }

  componentWillMount()
    { this.props.fetchBatches() }

      linkToBatch = batchId => event => this.props.push(`batches/${batchId}`)


  render() {
    //if (!this.props.signedIn) return <SignIn />

    return(

      <div className="batch" style={styles.root}>

       <GridList style={styles.gridList} cellHeight={100} >
       {this.props.batches.map((batch) => (

         <GridTile style={styles.gridTile}
         key={batch._id}
         title= {"Batch  #" + batch.batchNumber}
         subtitle={<span>{batch.startDate.substr(0,10) + " - " + batch.endDate.substr(0,10)}</span>}
         titleStyle={styles.titleStyle}

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
