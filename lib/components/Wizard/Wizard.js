var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Persist from '../withPersist/withPersist';

var Wizard = function (_Component) {
  _inherits(Wizard, _Component);

  function Wizard(props) {
    _classCallCheck(this, Wizard);

    var _this = _possibleConstructorReturn(this, (Wizard.__proto__ || Object.getPrototypeOf(Wizard)).call(this, props));

    var start = _this.props.start;


    _this.state = {
      page: start,
      prev: false,
      next: false,
      completed: false
    };

    _this.checkIfOnLastPage = _this.checkIfOnLastPage.bind(_this);

    _this.allow = _this.allow.bind(_this);
    _this.deny = _this.deny.bind(_this);
    _this.jump = _this.jump.bind(_this);
    _this.jumpToIndex = _this.jumpToIndex.bind(_this);
    _this.getAllData = _this.getAllData.bind(_this);
    _this.clearAllData = _this.clearAllData.bind(_this);
    _this.reset = _this.reset.bind(_this);
    _this.allowBack = _this.allowBack.bind(_this);
    _this.denyBack = _this.denyBack.bind(_this);
    return _this;
  }

  _createClass(Wizard, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var _state = this.state,
          page = _state.page,
          prev = _state.prev;


      if (page === 0 && prev) {
        this.setState({ prev: false });
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _state2 = this.state,
          page = _state2.page,
          prev = _state2.prev;


      if (page !== 0 && prev === false) {
        this.setState({ prev: true });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.props.clearOnClose) {
        sessionStorage.removeItem('Wizard');
        this.clearAllData();
      }
    }
  }, {
    key: 'pageNext',
    value: function pageNext() {
      var page = this.state.page;
      var children = this.props.children;


      if (page < children.length - 1) {
        this.setState({ page: page + 1, next: false, prev: true });
      }
    }
  }, {
    key: 'pageBack',
    value: function pageBack() {
      var page = this.state.page;


      if (page > 0) {
        this.setState({ page: page - 1, next: true });
      }
    }
  }, {
    key: 'checkIfOnLastPage',
    value: function checkIfOnLastPage() {
      return this.state.page === this.props.children.length - 1;
    }
  }, {
    key: 'allow',
    value: function allow() {
      this.setState({ next: true });
    }
  }, {
    key: 'deny',
    value: function deny() {
      this.setState({ next: false });
    }
  }, {
    key: 'allowBack',
    value: function allowBack() {
      this.setState({ prev: true });
    }
  }, {
    key: 'denyBack',
    value: function denyBack() {
      this.setState({ prev: false });
    }
  }, {
    key: 'jumpToIndex',
    value: function jumpToIndex(idx) {
      this.setState({ page: Math.floor(idx) });
    }
  }, {
    key: 'jump',
    value: function jump(name) {
      // EXPERIMENTAL. Dangerous! 
      // Need to worry about jumping back and forth and handling button disabling.
      var children = this.props.children;

      var index = children.findIndex(function (child) {
        return child.type.displayName === name;
      });

      this.setState({ page: index });
    }
  }, {
    key: 'getAllData',
    value: function getAllData() {
      var returnObj = {};
      this.props.children.forEach(function (child) {
        var key = child.type.displayName;
        var value = sessionStorage.getItem(key);

        returnObj[key] = value;
      });

      return returnObj;
    }
  }, {
    key: 'clearAllData',
    value: function clearAllData() {
      this.props.children.forEach(function (child) {
        var key = child.type.displayName;
        sessionStorage.removeItem(key);
      });
    }
  }, {
    key: 'reset',
    value: function reset() {
      var start = this.props.start;


      this.setState({
        page: start,
        prev: !(start === 0),
        next: false,
        completed: false
      });
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit() {
      var data = this.getAllData();
      this.setState({ completed: true });
      this.clearAllData();

      return this.props.onComplete(data);
    }
  }, {
    key: 'handleKeyPress',
    value: function handleKeyPress(e) {
      if (!this.props.disallowEnterKey && e.key === 'Enter') {
        if (this.checkIfOnLastPage()) {
          this.handleSubmit();
        } else {
          this.pageNext();
        }
      }
    }
  }, {
    key: 'renderNextOrSubmit',
    value: function renderNextOrSubmit() {
      var _this2 = this;

      var next = this.state.next;
      var _props = this.props,
          nextButtonText = _props.nextButtonText,
          submitButtonText = _props.submitButtonText,
          nextButtonCls = _props.nextButtonCls,
          nextButtonStyle = _props.nextButtonStyle,
          submitButtonCls = _props.submitButtonCls,
          submitButtonStyle = _props.submitButtonStyle,
          buttonCls = _props.buttonCls,
          buttonStyle = _props.buttonStyle;


      return this.checkIfOnLastPage() ? React.createElement(
        'button',
        {
          type: 'submit',
          disabled: !next,
          onClick: function onClick() {
            return _this2.handleSubmit();
          },
          style: Object.assign({}, buttonStyle, submitButtonStyle),
          className: buttonCls + ' ' + submitButtonCls
        },
        submitButtonText
      ) : React.createElement(
        'button',
        {
          type: 'button',
          disabled: !next,
          onClick: function onClick() {
            return _this2.pageNext();
          },
          style: Object.assign({}, buttonStyle, nextButtonStyle),
          className: buttonCls + ' ' + nextButtonCls
        },
        nextButtonText
      );
    }
  }, {
    key: 'renderBack',
    value: function renderBack() {
      var _this3 = this;

      var prev = this.state.prev;
      var _props2 = this.props,
          prevButtonText = _props2.prevButtonText,
          prevButtonStyle = _props2.prevButtonStyle,
          prevButtonCls = _props2.prevButtonCls,
          buttonCls = _props2.buttonCls,
          buttonStyle = _props2.buttonStyle;


      return React.createElement(
        'button',
        {
          type: 'button',
          onClick: function onClick() {
            return _this3.pageBack();
          },
          disabled: !prev,
          style: Object.assign({}, buttonStyle, prevButtonStyle),
          className: buttonCls + ' ' + prevButtonCls
        },
        prevButtonText
      );
    }
  }, {
    key: 'renderTextProgressBar',
    value: function renderTextProgressBar() {
      var page = this.state.page;
      var _props3 = this.props,
          children = _props3.children,
          textProgressCls = _props3.textProgressCls,
          textProgressStyle = _props3.textProgressStyle;


      return React.createElement(
        'div',
        { style: textProgressStyle, className: textProgressCls },
        'Step ',
        page + 1,
        ' of ',
        children.length,
        '.'
      );
    }
  }, {
    key: 'renderPercentageProgress',
    value: function renderPercentageProgress() {
      var page = this.state.page;
      var _props4 = this.props,
          children = _props4.children,
          percentageProgressCls = _props4.percentageProgressCls,
          percentageProgressStyle = _props4.percentageProgressStyle;


      var percentage = Math.floor(page / children.length * 100);

      return React.createElement(
        'progress',
        {
          style: percentageProgressStyle,
          className: percentageProgressCls,
          value: percentage,
          max: 100
        },
        percentage,
        '%'
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var _props5 = this.props,
          children = _props5.children,
          showTextProgressBar = _props5.showTextProgressBar,
          showPercentageProgress = _props5.showPercentageProgress,
          onCompleteText = _props5.onCompleteText,
          buttonNavContainerCls = _props5.buttonNavContainerCls,
          buttonNavContainerStyle = _props5.buttonNavContainerStyle;
      var _state3 = this.state,
          page = _state3.page,
          completed = _state3.completed;
      var allow = this.allow,
          deny = this.deny,
          jump = this.jump,
          jumpToIndex = this.jumpToIndex,
          getAllData = this.getAllData,
          clearAllData = this.clearAllData,
          allowBack = this.allowBack,
          denyBack = this.denyBack;


      var nav = {
        allow: allow,
        deny: deny,
        jump: jump,
        jumpToIndex: jumpToIndex,
        getAllData: getAllData,
        clearAllData: clearAllData,
        allowBack: allowBack,
        denyBack: denyBack
      };

      if (completed) {
        return React.createElement(
          'div',
          null,
          onCompleteText
        );
      }

      return React.createElement(
        'div',
        { onKeyPress: function onKeyPress(e) {
            return _this4.handleKeyPress(e);
          } },
        React.cloneElement(children[page], { nav: nav }),
        showPercentageProgress && this.renderPercentageProgress(),
        showTextProgressBar && this.renderTextProgressBar(),
        React.createElement(
          'div',
          { style: buttonNavContainerStyle, className: buttonNavContainerCls },
          this.renderBack(),
          this.renderNextOrSubmit()
        )
      );
    }
  }]);

  return Wizard;
}(Component);

var navigationBtnContainerStyle = {
  display: 'flex'
};

Wizard.defaultProps = {
  start: 0,
  showTextProgressBar: false,
  showPercentageProgress: false,
  disallowEnterKey: false,
  clearOnClose: false,
  onCompleteText: 'Thanks for completing!',
  nextButtonText: 'Next',
  prevButtonText: 'Prev',
  submitButtonText: 'Submit',
  buttonNavContainerStyle: navigationBtnContainerStyle
};

Wizard.propTypes = {
  onComplete: PropTypes.func.isRequired,

  start: PropTypes.number,
  showTextProgressBar: PropTypes.bool,
  showPercentageProgress: PropTypes.bool,
  onCompleteText: PropTypes.string,
  disallowEnterKey: PropTypes.bool,
  clearOnClose: PropTypes.bool,
  nextButtonText: PropTypes.string,
  prevButtonText: PropTypes.string,
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
  percentageProgressCls: PropTypes.string
};

export default Persist(Wizard);

// export const PersistedWizard = Persist(Wizard);
// export default Wizard;