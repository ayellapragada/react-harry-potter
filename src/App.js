import React, { Component } from 'react';

import Wizard from './components/Wizard';
import InputOne from './examples/InputOne.js';
import InputTwo from './examples/InputTwo.js';
import InputThree from './examples/InputThree.js';

class App extends Component {
  render() {
    return (
      <Wizard>
        <InputOne />
        <InputTwo />
        <InputThree />
      </Wizard>
    );
  }
}

export default App;
