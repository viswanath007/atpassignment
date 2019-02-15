import {GET_HASHTAGS} from './constants';

export const getHashtags = (hashtags) => dispatch => {
  // console.log(hashtags);
  return dispatch({ type: GET_HASHTAGS, payload: hashtags });
}
