import React, { Component } from 'react';
import Persist from '../components/Persist.js';

class InputThree extends Component {
  constructor(props) {
    super(props);
    this.state = { input: ""};

    this.props.nav.allow();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.screen !== nextProps.screen) {
      this.setState({ input: "" });
    }
  } 

  changeInput(e) {
    this.setState({ input: e.currentTarget.value });
    this.props.nav.allow();
  }

  render() {
    return (
      <div>
        Three
        <input 
          type="text" 
          value={this.state.input} 
          onChange={(e) => this.changeInput(e)} 
        />
        <button type="button" onClick={() => this.props.nav.jumpToIndex('1')}>
          Jump to 2!
        </button>
      </div>
    );
  }
}

export default Persist(InputThree);
