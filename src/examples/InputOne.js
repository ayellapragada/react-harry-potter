import React, { Component } from 'react';
import { withPersist } from '../components/';

class InputOne extends Component {
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
  }

  render() {
    return (
      <div>
        One
        <input 
          type="text" 
          value={this.state.input} 
          onChange={(e) => this.changeInput(e)} 
        />
      </div>
    );
  }
}

export default withPersist(InputOne);
