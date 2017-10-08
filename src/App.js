import React, { Component } from 'react';

import Wizard from './components/Wizard';
import InputOne from './examples/InputOne.js';
import InputTwo from './examples/InputTwo.js';
import InputThree from './examples/InputThree.js';

class App extends Component {
  handleComplete(data) {
    console.log(data);
  }


  render() {
    return (
      <Wizard onComplete={this.handleComplete}>
        <InputTwo />
        <InputThree />
        <InputOne />
      </Wizard>
    );
  }
}

export default App;
