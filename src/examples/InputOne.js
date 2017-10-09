import React, { Component } from 'react';
import { withPersist } from '../components/';

class InputOne extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "", confirm: ""};
  }

  componentDidUpdate(prevProps, prevState) {
    const { allow, deny } = this.props.nav;

    if (prevState !== this.state) {
      if (this.complete()) { allow(); }
      else { deny(); }
    }
  }

  changeInput(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }

  complete() {
    const { username, password, confirm } = this.state;

    return (username.length > 6 &&
      password.length > 6 &&
      confirm.length > 6 &&
      password === confirm
    );
  }

  render() {
    const { username, password, confirm } = this.state;

    return (
      <form>
        One
        <br />
        <label>
          Username:
          <input 
            type="text" 
            value={username} 
            onChange={this.changeInput('username')} 
          />
        </label>
        <br />

        <label>
          Password:
          <input 
            type="password" 
            value={password} 
            onChange={this.changeInput('password')} 
          />
        </label>
        <br />

        <label>
          Confirm Password:
          <input 
            type="password" 
            value={confirm} 
            onChange={this.changeInput('confirm')} 
          />
        </label>
        <br />

      </form>
    );
  }
}

export default withPersist(InputOne);
