import React, { Component } from 'react';

class Wizard extends Component {
  constructor(props) {
    super(props);
    const { start } = this.props;
    this.state = { page: start || 0, prev: false, next: false };
    this.allow = this.allow.bind(this);
    this.deny = this.deny.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const { page, prev } = this.state;

    if (page === 0 && prev === true) {
      this.setState({ prev: false });
    }
  }

  componentDidMount() {
    const { page, prev } = this.state;

    if ( this.page !== 0 && prev === false ) {
      this.setState({ prev: true });
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

  handleSubmit() {
    const returnObj = {};
    this.props.children.map(child => {
      const key = child.type.displayName;
      const value = sessionStorage.getItem( key );

      returnObj[key] = value;
    });

    return returnObj;
  }

  renderNextOrSubmit() {
    const { page, next } = this.state;
    const { children } = this.props;

    return page === (children.length - 1) 
      ? <button 
          type="submit"
          disabled={!next}
          onClick={() => this.handleSubmit()}
        >
          Finish!
        </button>
      : <button 
        type="button" 
        disabled={!next}
        onClick={() => this.pageNext()}
      >
        Next
      </button>;
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

          {this.renderNextOrSubmit()}
        </div>
      </div>
    );

  }
}


const buttonStyle = {
  display: 'flex',
};

export default Wizard;
