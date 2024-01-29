import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class LoginPage extends Component {
  state = {
    isError: false,
    errorMSG: '',
    password: '',
    username: '',
  }

  onClickingCheckBox = () =>
    this.setState(prev => ({isPassword: !prev.isPassword}))

  onChangingUsername = event =>
    this.setState({username: event.target.value, isError: false})

  onChangingPassword = event =>
    this.setState({password: event.target.value, isError: false})

  onSuccessLogin = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  submittingLoginForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {
      username,
      password,
    }
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    // console.log(response)
    const data = await response.json()
    if (response.ok) {
      this.onSuccessLogin(data.jwt_token)
    } else {
      this.setState({isError: true, errorMSG: data.error_msg})
    }
  }

  render() {
    const {isError, errorMSG, username, password} = this.state

    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-form-main-container">
        <img
          src="https://res.cloudinary.com/dojn2omox/image/upload/v1701694638/pootp9zemfypdriwlvww.png"
          alt="login website logo"
        />
        <div className="login-form-second-container">
          <h1>Login</h1>
          <form onSubmit={this.submittingLoginForm}>
            <label htmlFor="forUser" className="login-label-details">
              USERNAME
            </label>
            <br />
            <input
              type="text"
              id="forUser"
              placeholder="Username"
              className="login-input-details"
              value={username}
              onChange={this.onChangingUsername}
            />
            <br />
            <label htmlFor="forPassword" className="login-label-details">
              PASSWORD
            </label>
            <br />
            <input
              type="password"
              id="forPassword"
              placeholder="Password"
              className="login-input-details"
              value={password}
              onChange={this.onChangingPassword}
            />

            <br />
            <button type="submit" className="login-button-details">
              Login
            </button>
            {isError && <p className="error-msg-details">*{errorMSG}</p>}
            <br />
          </form>
        </div>
      </div>
    )
  }
}

export default LoginPage
