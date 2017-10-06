import React, { Component } from 'react';

import Wizard from './components/Wizard';
import Step from './components/Step';
import Input from './examples/Input';

class App extends Component {
  render() {
    return (
      <div>
        <Wizard>
          <Step><Input num={0}/></Step>
          <Step><Input num={1}/></Step>
          <Step><Input num={2}/></Step>
          <Step><Input num={3}/></Step>
        </Wizard>
      </div>
    );
  }
}

export default App;
