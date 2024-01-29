import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import Header from '../Header'
import SocialMediaPage from '../SocialMediaPage'
import './index.css'

const AccountPage = props => {
  const onClickingLogoutButton = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <div>
      <Header />
      <div className="account-section-details">
        <h1>Account</h1>
        <hr />
        <div className="flex-account">
          <p>Member ship</p>
          <div className="account-margin-left">
            <p>rahul@gmail.com</p>
            <p>Password : ********</p>
          </div>
        </div>
        <hr />
        <div className="flex-account">
          <p>Plan details</p>
          <div className="account-margin-left">
            <p>Premium</p>
            <p>Ultra HD</p>
          </div>
        </div>
        <hr />
        <div className="button-in-center">
          <button
            type="button"
            onClick={onClickingLogoutButton}
            className="logoutButtonDetails"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="detailsOfSocail">
        <SocialMediaPage />
      </div>
    </div>
  )
}

export default withRouter(AccountPage)
