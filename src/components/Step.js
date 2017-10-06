import React, { Component } from 'react';

class Step extends Component {

  render() {
    const { children } = this.props;

    return (
      <div>
        {children}
      </div>
    );
  }

}

export default Step;
