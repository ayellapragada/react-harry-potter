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

    if (page === 0 && prev) {
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

  handleKeyPress(e) {
    if (!this.props.disallowEnterKey && e.key === 'Enter') {
      if (this.checkIfOnLastPage()) { this.handleSubmit(); } 
      else { this.pageNext(); }
    }
  }

  renderNextOrSubmit() {
    const { next } = this.state;
    const { nextButtonText, submitButtonText, 
      nextButtonCls, nextButtonStyle, 
      submitButtonCls, submitButtonStyle, 
      buttonCls, buttonStyle } = this.props;

    return this.checkIfOnLastPage()
      ? <button 
        type="submit"
        disabled={!next}
        onClick={() => this.handleSubmit()}
        style={{...buttonStyle, ...submitButtonStyle}}
        className={`${buttonCls} ${submitButtonCls}`}
      >
        {submitButtonText}
      </button>
      : <button 
        type="button" 
        disabled={!next}
        onClick={() => this.pageNext()}
        style={{...buttonStyle, ...nextButtonStyle}}
        className={`${buttonCls} ${nextButtonCls}`}
      >
        {nextButtonText}
      </button>;
  }

  renderBack() {
    const { prev } = this.state;
    const { prevButtonText, 
      prevButtonStyle, prevButtonCls,
      buttonCls, buttonStyle } = this.props;

    return (
      <button 
        type="button" 
        onClick={() => this.pageBack()}
        disabled={!prev}
        style={{...buttonStyle, ...prevButtonStyle}}
        className={`${buttonCls} ${prevButtonCls}`}
      >
        { prevButtonText }
      </button>
    );
  }

  renderTextProgressBar() {
    const { page } = this.state;
    const { children, textProgressCls, textProgressStyle } = this.props;

    return (
      <div style={textProgressStyle} className={textProgressCls}>
        Step {page + 1} of {children.length}.
      </div> 
    );
  }

  renderPercentageProgress() {
    const { page } = this.state;
    const { children, percentageProgressCls, 
      percentageProgressStyle } = this.props;

    let percentage = Math.floor((page / children.length) * 100);

    return (
      <progress 
        style={percentageProgressStyle} 
        className={percentageProgressCls}
        value={percentage}
        max={100}
      >
        { percentage }%
      </progress>
    );
  }

  render() {
    const { children, showTextProgressBar, showPercentageProgress,  
      onCompleteText, buttonNavContainerCls, 
      buttonNavContainerStyle } = this.props;
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
        {React.cloneElement(children[page], { nav })}
        { showPercentageProgress && this.renderPercentageProgress() }
        { showTextProgressBar && this.renderTextProgressBar() }
        <div style={buttonNavContainerStyle} className={buttonNavContainerCls}>
          {this.renderBack()}
          {this.renderNextOrSubmit()}
        </div>
      </div>
    );

  }
}

const navigationBtnContainerStyle = {
  display: 'flex',
};

Wizard.defaultProps = {
  start: 0,
  showTextProgressBar: false,
  showPercentageProgress: false,
  disallowEnterKey: false,
  onCompleteText: 'Thanks for completing!',
  nextButtonText: 'Next',
  prevButtonText: 'Prev',
  submitButtonText: 'Submit',
  buttonNavContainerStyle: navigationBtnContainerStyle,
};

Wizard.propTypes = {
  onComplete: PropTypes.func.isRequired,

  start: PropTypes.number,
  showTextProgressBar: PropTypes.bool,
  showPercentageProgress: PropTypes.bool,
  onCompleteText: PropTypes.string,
  disallowEnterKey: PropTypes.bool,
  nextButtonText: PropTypes.string,
  prevButtonText:  PropTypes.string,
  submitButtonText: PropTypes.string,

  containerStyle: PropTypes.object,
  buttonNavContainerStyle: PropTypes.object,
  buttonStyle: PropTypes.object,
  prevButtonStyle: PropTypes.object,
  nextButtonStyle: PropTypes.object,
  submitButtonStyle: PropTypes.object,
  textProgressStyle: PropTypes.object,
  percentageProgressStyle: PropTypes.object,

  containerCls: PropTypes.string,
  buttonNavContainerCls: PropTypes.string,
  buttonCls: PropTypes.string,
  prevButtonCls: PropTypes.string,
  nextButtonCls: PropTypes.string,
  submitButtonCls: PropTypes.string,
  textProgressCls: PropTypes.string,
  percentageProgressCls: PropTypes.string,
};

export const PersistedWizard = Persist(Wizard);
export default Persist(Wizard);
// export default Wizard;
