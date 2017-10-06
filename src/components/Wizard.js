import React, { Component } from 'react';

class Wizard extends Component {
  constructor(props) {
    super(props);
    this.state = { page: 0 };
  }

  pageUp() {
    const { page } = this.state;
    const { children } = this.props;

    if (page < children.length - 1) {
      this.setState({ page: this.state.page + 1 });
    }
  }

  pageDown() {
    const { page } = this.state;

    if (page > 0 ) {
      this.setState({ page: this.state.page - 1 });
    }
  } 

  render() {
    return (
      <div>
        <div onClick={() => this.pageDown()}>Right</div>
        <div>
          {this.props.children[this.state.page]}
        </div>
        <div onClick={() => this.pageUp()}>Left</div>
      </div>
    );
  }
}

export default Wizard;
