import React, { Component } from 'react';
import { withPersist } from '../components/';

class InputTwo extends Component {
  constructor(props) {
    super(props);
    this.state = { gender: "male"};
    this.props.nav.allow();
  }

  changeInput(e) {
    this.setState({ input: e.currentTarget.value });
  }

  render() {
    return (
      <form>
        Two
        <br />
        <input 
          type="radio" 
          value={this.state.input} 
          onChange={(e) => this.changeInput(e)} 
        />
      </form>
    );
  }
}

export default withPersist(InputTwo);
