import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

import './index.css'

const SocialMediaPage = () => (
  <div>
    <div className="display-social-flex">
      <FaGoogle size="18" color="#ffff" className="social-icon-details" />
      <FaTwitter size="18" color="#ffff" className="social-icon-details" />
      <FaInstagram size="18" color="#ffff" className="social-icon-details" />
      <FaYoutube size="18" color="#ffff" className="social-icon-details" />
    </div>
    <p className="address-details">Contact Us</p>
  </div>
)

export default SocialMediaPage
