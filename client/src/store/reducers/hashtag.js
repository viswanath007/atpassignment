import {GET_HASHTAGS} from '../actions/constants'

const hashtagReducer = (state = [], {type, payload}) => {
    switch (type) {
      case GET_HASHTAGS:
        return payload
      default:
        return state
    }
}

export default hashtagReducer;
