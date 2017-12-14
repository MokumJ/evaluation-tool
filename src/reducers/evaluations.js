import { EVALUATIONS_FETCHED } from '../actions/evaluations/fetch'
import { EVALUATION_CREATED } from '../actions/evaluations/create'

export default (state = [], { type, payload } = {}) => {
  switch (type) {
    case EVALUATIONS_FETCHED :
        return [ ...payload ]

    case EVALUATION_CREATED :
        return [{...payload}, ...state]

        default :
          return state
  }
}
