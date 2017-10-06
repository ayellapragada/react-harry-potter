import React, { Component } from 'react';

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {...props.state, input: ""};
  }

  componentWillUnmount() {
    this.props.saveState(this.state);
  }

  changeInput(e) {
    this.setState({ input: e.currentTarget.value });
  }

  render() {
    return (
      <div>
        {this.props.num}
        <input 
          type="text" 
          value={this.state.input} 
          onChange={(e) => this.changeInput(e)} 
        />
      </div>
    );
  }
}

export default Input;
