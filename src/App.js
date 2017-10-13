import React, { Component } from 'react';

import Wizard from './node_modules';
import InputOne from './examples/InputOne.js';
import InputTwo from './examples/InputTwo.js';
import InputThree from './examples/InputThree.js';

class App extends Component {
  constructor() {
    super();

    this.state = { show: true };
  }

  handleComplete(data) {
    console.log(data);
  }

  render() {
    return (
      <div>
        { this.state.show &&
            <Wizard 
              onComplete={this.handleComplete}
            >
              <InputOne />
              <InputTwo />
              <InputThree />
            </Wizard>
        }

        <button onClick={() => this.setState({ show: !this.state.show })}>
          Show?
        </button>
      </div>
    );
  }
}

export default App;
