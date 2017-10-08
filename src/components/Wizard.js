import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import Persist from './Persist';

class Wizard extends Component {
  constructor(props) {
    super(props);
    const { start } = this.props;

    this.state = { 
      page: start, 
      prev: false, 
      next: false, 
      submitted: false 
    };

    this.allow = this.allow.bind(this);
    this.deny = this.deny.bind(this);
    this.jump = this.jump.bind(this);
    this.getAllData = this.getAllData.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const { page, prev } = this.state;

    if (page === 0 && prev === true) {
      this.setState({ prev: false });
    }
  }

  componentDidMount() {
    const { page, prev } = this.state;

    if ( page !== 0 && prev === false ) {
      this.setState({ prev: true });
    }
  }

  pageNext() {
    const { page } = this.state;
    const { children } = this.props;

    if (page < children.length - 1) {
      this.setState({ page: page + 1, next: false, prev: true });
    }
  }

  pageBack() {
    const { page } = this.state;

    if (page > 0 ) {
      this.setState({ page: page - 1, next: true });
    }
  } 

  allow() {
    this.setState({ next: true });
  }

  deny() {
    this.setState({ next: false });
  }

  jump(name) {
    // EXPERIMENTAL. Dangerous, need to worry about jumping back and forth and
    // handling button disabling.

    const { children } = this.props;
    const index = children.findIndex(child => child.type.displayName === name);

    this.setState({ page: index });
  }

  getAllData() {
    const returnObj = {};
    this.props.children.forEach(child => {
      const key = child.type.displayName;
      const value = sessionStorage.getItem( key );

      returnObj[key] = value;
    });

    return returnObj;
  }

  handleSubmit() {
    const data = this.getAllData();

    this.setState({ submitted: true });
    return this.props.onComplete(data);
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
    const { children, showProgress, onCompleteText } = this.props;
    const { prev, page, submitted } = this.state;
    const { allow, deny, jump, getAllData } = this;

    const nav = { allow, deny, jump, getAllData };

    if (submitted) {
      return <div>{onCompleteText}</div>;
    }

    return (
      <div>
        <div>
          {React.cloneElement(children[page], { nav })}
        </div>
        { showProgress && <div> Step {page + 1} of {children.length}.</div> }
        <div style={navigationBtnContainerStyle}>
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

Wizard.defaultProps = {
  start: 0,
  showProgress: false,
  onCompleteText: 'Thanks for submitting!',
};

Wizard.propTypes = {
  onComplete: PropTypes.func.isRequired,
  start: PropTypes.number,
  showProgress: PropTypes.bool,
  onCompleteText: PropTypes.string,
};


const navigationBtnContainerStyle = {
  display: 'flex',
};

// export default Persist(Wizard);
export default Wizard;
