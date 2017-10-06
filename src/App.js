import React, { Component } from 'react';

import Wizard from './components/Wizard';
import Step from './components/Step';
import Input from './examples/Input';

class App extends Component {
  render() {
    return (
      <Wizard>
        <Step screen="zero"><Input num={0}/></Step>
        <Step screen="one"><Input num={1}/></Step>
        <Step screen="two"><Input num={2}/></Step>
        <Step screen="three"><Input num={3}/></Step>
      </Wizard>
    );
  }
}

export default App;
