import { FETCHED_BATCHES, FETCHED_ONE_BATCH, CREATE_BATCH } from '../actions/batches'

export default (state = [], { type, payload } = {}) => {
  switch(type) {
    case  FETCHED_BATCHES:
      return [ ...payload ]

      case FETCHED_ONE_BATCH :
        return { ...payload }

    case CREATE_BATCH :
     const newBatch = { ...payload }
     return [newBatch].concat(state)

    default :
      return state
  }
}
