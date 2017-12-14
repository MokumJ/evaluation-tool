import { FETCHED_ONE_BATCH } from '../actions/batches'

export default (state = [], { type, payload } = {}) => {
  switch(type) {

     case FETCHED_ONE_BATCH:
        return [...payload.students]

        default:
      return state
      }

}
