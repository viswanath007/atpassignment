import {combineReducers} from 'redux';
import hashtagReducer from './hashtag';

export default combineReducers({
  hashtag: hashtagReducer
})
