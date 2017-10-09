import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Persist from './Persist';

class Wizard extends Component {
  constructor(props) {
    super(props);
    const { start } = this.props;

    this.state = { 
      page: start, 
      prev: false, 
      next: false, 
      completed: false 
    };

    this.checkIfOnLastPage = this.checkIfOnLastPage.bind(this);

    this.allow = this.allow.bind(this);
    this.deny = this.deny.bind(this);
    this.jump = this.jump.bind(this);
    this.jumpToIndex = this.jumpToIndex.bind(this);
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

  handleKeyPress(e) {
    if (!this.props.disallowEnterKey && e.key === 'Enter') {
      if (this.checkIfOnLastPage()) {
        this.handleSubmit();
      }
      this.pageNext();
    }
  }

  checkIfOnLastPage() {
    return this.state.page === this.props.children.length - 1;
  }

  allow() { this.setState({ next: true }); }
  deny() { this.setState({ next: false }); }
  allowBack() { this.setState({ prev: true }); }
  denyBack() { this.setState({ prev: false }); }
  jumpToIndex(idx) { this.setState({ page: Math.floor(idx) }); }

  jump(name) {
    // EXPERIMENTAL. Dangerous! 
    // Need to worry about jumping back and forth and handling button disabling.
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

    this.setState({ completed: true });
    return this.props.onComplete(data);
  }

  renderNextOrSubmit() {
    const { next } = this.state;
    const { nextButtonText, submitButtonText } = this.props;

    return this.checkIfOnLastPage()
      ? <button 
        type="submit"
        disabled={!next}
        onClick={() => this.handleSubmit()}
      >
        {submitButtonText}
      </button>
      : <button 
        type="button" 
        disabled={!next}
        onClick={() => this.pageNext()}
      >
        {nextButtonText}
      </button>;
  }

  renderBack() {
    const { prev } = this.state;
    const { prevButtonText } = this.props;

    return (
      <button 
        type="button" 
        onClick={() => this.pageBack()}
        disabled={!prev}
      >
        { prevButtonText }
      </button>
    );
  }

  renderTextProgressBar() {
    const { page } = this.state;
    const { children } = this.props;

    return (
      <div>
        Step {page + 1} of {children.length}.
      </div> 
    );
  }

  render() {
    const { children, showTextProgressBar, onCompleteText } = this.props;
    const { page, completed } = this.state;
    const { allow, deny, jump, jumpToIndex, getAllData, 
      allowBack, denyBack } = this;

    const nav = { 
      allow, 
      deny, 
      jump, 
      jumpToIndex,
      getAllData, 
      allowBack, 
      denyBack 
    };

    if (completed) {
      return <div>{onCompleteText}</div>;
    }

    return (
      <div onKeyPress={(e) => this.handleKeyPress(e)}>
        <div>
          {React.cloneElement(children[page], { nav })}
        </div>
        { showTextProgressBar && this.renderTextProgressBar() }
        <div style={navigationBtnContainerStyle}>
          {this.renderBack()}
          {this.renderNextOrSubmit()}
        </div>
      </div>
    );

  }
}

Wizard.defaultProps = {
  start: 0,
  showTextProgressBar: false,
  disallowEnterKey: false,
  onCompleteText: 'Thanks for completing!',
  nextButtonText: 'Next',
  prevButtonText: 'Prev',
  submitButtonText: 'Submit',
};

Wizard.propTypes = {
  onComplete: PropTypes.func.isRequired,

  start: PropTypes.number,
  showTextProgressBar: PropTypes.bool,
  onCompleteText: PropTypes.string,
  disallowEnterKey: PropTypes.bool,
  nextButtonText: PropTypes.string,
  prevButtonText:  PropTypes.string,
  submitButtonText: PropTypes.string,
};


const navigationBtnContainerStyle = {
  display: 'flex',
};

export const PersistedWizard = Persist(Wizard);
export default Wizard;
