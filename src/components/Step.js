import React, { Component } from 'react';

class Step extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.name !== nextProps.name) {
      sessionStorage.setItem(this.props.name, JSON.stringify(this.state));
      this.getNewState();
    }
  }

  componentDidMount() {
    this.getNewState();
  }

  componentWillUnmount() {
    sessionStorage.setItem(this.props.name, JSON.stringify(this.state));
  }

  saveState(newState) {
    this.setState(...newState);
  }

  getNewState() {
    const newState = JSON.parse(sessionStorage.getItem(this.props.name)) || {}; 
    console.log(newState);
    this.setState({ ...newState });
  }

  render() {
    const saveState = this.saveState;
    const { name } = this.props;

    return (
      <div>
        {React.cloneElement(
          this.props.children, {...this.state, name ,saveState}
        )}
      </div>
    );
  }

}

export default Step;
