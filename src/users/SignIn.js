import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import signIn from '../actions/user/sign-in'
import Title from '../components/Title'
import { Link } from 'react-router-dom'

export class SignIn extends PureComponent {
  constructor() {
    super()
    this.state = {}
  }

  submitForm(event) {
    event.preventDefault()
    if (this.validateAll()) {
      const user = {
        email: this.refs.email.value,
        password: this.refs.password.value
      }
      this.props.signIn(user)
    }
  }

  validateAll() {
    return this.validateEmail() &&
      this.validatePassword()
  }

  validateEmail() {
    const { email } = this.refs

    if (email.value.match(/^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z0-9._-]+$/)) {
      this.setState({
        emailError: null
      })
      return true
    }

    if (email.value === '') {
      this.setState({
        emailError: 'Please provide your email address'
      })
      return false
    }

    this.setState({
      emailError: 'Please provide a valid email address'
    })
    return false
  }

  validatePassword() {
    const { password } = this.refs

    if (password.value.length < 6) {
      this.setState({
        passwordError: 'Password is too short'
      })
      return false
    }

    if (password.value.match(/[a-zA-Z]+/) && password.value.match(/[0-9]+/)) {
      this.setState({
        passwordError: null
      })
      return true
    }

    this.setState({
      passwordError: 'Password should contain both letters and numbers'
    })
    return false
  }

  render() {
    return (
      <div className="sign-in form">
        <Title content="Sign In" />

        <form onSubmit={this.submitForm.bind(this)}>
          <div className="input">
            <input ref="email" type="email" placeholder="Email address"
              onChange={this.validateEmail.bind(this)} />
            { this.state.emailError ?
              <p className="formError">{ this.state.emailError }</p> :
              null
            }
          </div>
          <div className="input">
            <input ref="password" type="password" placeholder="Password"
              onChange={this.validatePassword.bind(this)} />
            { this.state.passwordError ?
              <p className="formError">{ this.state.passwordError }</p> :
              null
            }
          </div>
          <input type="submit" value="Sign in" />
          No account yet? ➜ <Link to="/sign-up">Sign up</Link> instead
        </form>
      </div>
    )
  }
}

export default connect(null, { signIn })(SignIn)
