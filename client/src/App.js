import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import io from 'socket.io-client';
import './App.css'
import TopBar from './components/TopBar';
import BarGraph from './components/BarGraph';

import {getHashtags} from './store/actions/hashtag';


class App extends Component {
  componentDidMount(){
    const socket = io();
    socket.on('hashtagsCount', (msg) => {
      // console.log(msg);
      this.props.getHashtags(msg);
    }); 
  }

  render () {
    return(<div className="App">
      <Fragment>
        <TopBar />
        <BarGraph data={this.props.hashtags} />
      </Fragment>
      </div>);    
  }
}

const mapStateToProps = (state) => {
  const hashtags = state.hashtag;
  return {
    hashtags,
  };
}

const dispatchToProps = (dispatch) => ({
  getHashtags: (data) => dispatch(getHashtags(data)),
})

export default connect(mapStateToProps, dispatchToProps)(App);
