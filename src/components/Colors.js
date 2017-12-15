import React, { PureComponent } from 'react'
import Avatar from 'material-ui/Avatar';


class EvaluationColor extends PureComponent {
 render() {
   switch(this.props.currentColor){
     case 0:
     return(
       <Avatar backgroundColor= 'red' size={40} />
     )
     case 1:
     return(
       <Avatar backgroundColor= 'yellow' size={40} />
      )
      default:
      return(
        <Avatar backgroundColor= 'green' size={40} />
      )
    }
  }
}

export default EvaluationColor
