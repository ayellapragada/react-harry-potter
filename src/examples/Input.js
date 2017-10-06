import React, { Component } from 'react';

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = { input: "" };
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
