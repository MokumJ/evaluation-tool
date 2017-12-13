
import { FETCHED_BATCHES, FETCHED_ONE_BATCH, CREATE_BATCH } from '../actions/batches'

const newId = (state) => {
  const ids = state
    .map((student) => student._id)
    .sort()
  return ['abcd', parseInt(ids[ids.length - 1].split('abcd')[1], 10) + 1].join('')
}

export default (state = students, {type, payload} = {}) => {
  switch(type) {
    case FETCHED_RECIPES :
      return [ ...payload ]

    case CREATE_RECIPE :
      return [{ ...payload, _id: newId(state) }].concat(state)



    default :
      return state
  }
}
