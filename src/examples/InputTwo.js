import React, { Component } from 'react';
import Persist from '../components/Persist.js';

class InputTwo extends Component {
  constructor(props) {
    super(props);
    this.state = { input: ""};
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.screen !== nextProps.screen) {
      this.setState({ input: "" });
    }
  } 

  changeInput(e) {
    this.setState({ input: e.currentTarget.value });
  }

  render() {
    return (
      <div>
        Two
        <input 
          type="text" 
          value={this.state.input} 
          onChange={(e) => this.changeInput(e)} 
        />
      </div>
    );
  }
}

export default Persist(InputTwo);
