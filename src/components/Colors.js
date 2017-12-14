import React, { PureComponent } from 'react'
import Avatar from 'material-ui/Avatar';

class EvaluationColor extends PureComponent {
 render() {
   switch(this.props.currentColor){
     case 0:
     return(
     <background Color="red" />
     )
     case 1:
     return(
       <background Color="yellow" />
      )
      default:
      return(
        <background Color='green'/>
      )
    }
  }
}

export default EvaluationColor
