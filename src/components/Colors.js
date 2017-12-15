import React, { PureComponent } from 'react'
import Avatar from 'material-ui/Avatar';


class EvaluationColor extends PureComponent {
 render() {
   switch(this.props.currentColor){
     case 0:
     return(
       <Avatar backgroundColor= 'red' size={30} />
     )
     case 1:
     return(
       <Avatar backgroundColor= 'yellow' size={30} />
      )
      default:
      return(
        <Avatar backgroundColor= 'green' size={30} />
      )
    }
  }
}

export default EvaluationColor
