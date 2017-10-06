import React, { Component } from 'react';

class Step extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { name } = this.props;

    return (
      <div>
        {React.cloneElement(
          this.props.children, {...this.state, name}
        )}
      </div>
    );
  }

}

export default Step;
