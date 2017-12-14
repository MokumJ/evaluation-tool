import { EVALUATIONS_FETCHED } from '../actions/evaluations/fetch'
import { EVALUATION_CREATED } from '../actions/evaluations/create'
import { EVALUATE } from '../actions/evaluations/evaluate'

export default (state = [], { type, payload } = {}) => {

  switch (type) {
    case EVALUATIONS_FETCHED :
        return [ ...payload ]

    case EVALUATION_CREATED :
        return [{...payload}, ...state]

        case EVALUATE :
          return state.map((student) => {
            if (student._id === payload._id) {
        return { ...payload }
      }
        return student
    })
        default :
          return state

  }
}
