import { CREATE_RECIPE } from '../actions/recipes/create'

  export default (state = initialState, { type, payload } = {}) => {
    switch(type) {
      case CREATE_RECIPE :
        return [Object.assign({}, payload)].concat(state)

      default :
        return state
    }
  }
