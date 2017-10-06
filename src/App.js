import React, { Component } from 'react';

import Wizard from './components/Wizard';
import Step from './components/Step';
import Input from './examples/Input';

class App extends Component {
  render() {
    return (
      <div>
        <Wizard>
          <Step name="zero"><Input num={0}/></Step>
          <Step name="one"><Input num={1}/></Step>
          <Step name="two"><Input num={2}/></Step>
          <Step name="three"><Input num={3}/></Step>
        </Wizard>
      </div>
    );
  }
}

export default App;
