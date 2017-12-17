import { FETCHED_BATCHES, FETCHED_ONE_BATCH, CREATE_BATCH } from '../actions/batches'
import {CREATE_STUDENT} from '../actions/students'
import {CREATE_EVALUATION} from '../actions/evaluations'

export default (state = [], { type, payload } = {}) => {
  switch(type) {
    case  FETCHED_BATCHES:
      return [ ...payload ]


      case FETCHED_ONE_BATCH :
           const batchIds = state.map(b => b._id)
          if (batchIds.indexOf(payload._id) < 0) {
            return [{ ...payload }].concat(state)
         }

         return state.map((batch) => {
           if (batch._id === payload._id) {
             return { ...payload }
           }
         return batch
       })

       case CREATE_STUDENT:
     return state.map((batch) => {
       if (batch._id === payload._id) {
         return { ...payload }
       }
       return batch
     })

     case CREATE_EVALUATION:
     return state.map((batch) => {
       if (batch._id === payload._id) {
         return { ...payload }
       }
     return batch
   })

    case CREATE_BATCH :
     const newBatch = { ...payload }
     return [newBatch].concat(state)

    default :
      return state
  }
}
