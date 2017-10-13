import React, { Component } from 'react';
import { withPersist } from '../node_modules';

class InputThree extends Component {
  constructor(props) {
    super(props);
    this.state = { input: ""};

    this.props.nav.allow();
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

export default withPersist(InputThree);
