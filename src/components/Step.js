import React, { Component } from 'react';

class Step extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        {React.cloneElement(this.props.children, {...this.state})}
      </div>
    );
  }

}

export default Step;
