import React, { Component } from 'react';

class Wizard extends Component {
  constructor(props) {
    super(props);
    this.state = { page: 0, prev: false, next: false };
    this.allow = this.allow.bind(this);
    this.deny = this.deny.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const { page, prev } = this.state;

    if (page === 0 && prev === true) {
      this.setState({ prev: false });
    }
  }

  pageNext() {
    const { page } = this.state;
    const { children } = this.props;

    if (page < children.length - 1) {
      this.setState({ page: this.state.page + 1, next: false, prev: true });
    }
  }

  pageBack() {
    const { page } = this.state;

    if (page > 0 ) {
      this.setState({ page: this.state.page - 1, next: true });
    }
  } 

  allow() {
    this.setState({ next: true });
  }

  deny() {
    this.setState({ next: false });
  }

  render() {
    const { children } = this.props;
    const { prev, next, page } = this.state;

    const nav = { allow: this.allow, deny: this.deny };

    return (
      <div>
        <div>
          {React.cloneElement(children[page], { nav })}
        </div>
        <div style={buttonStyle}>

          <button 
            type="button" 
            onClick={() => this.pageBack()}
            disabled={!prev}
          >
            Previous
          </button>

          <button 
            type="button" 
            disabled={!next}
            onClick={() => this.pageNext()}
          >
            Next
          </button>

        </div>
      </div>
    );

  }
}


const buttonStyle = {
  display: 'flex',
};

export default Wizard;
