import {Component} from 'react'
import {HiOutlineSearch} from 'react-icons/hi'
import {Link} from 'react-router-dom'
import './index.css'

class Header extends Component {
  state = {currentPath: ''}

  componentDidMount() {
    const path = window.location.pathname
    console.log(path)
    this.setState({currentPath: path})
  }

  onClickingIcon = () => {
    const {apiSearch} = this.props
    const {currentPath} = this.state
    if (currentPath === '/search') {
      apiSearch()
    }
  }

  onSearchingInput = event => {
    const {gettingSearchText} = this.props
    gettingSearchText(event.target.value)
  }

  onEntering = event => {
    const {apiSearch} = this.props
    if (event.key === 'Enter') {
      apiSearch()
    }
  }

  render() {
    const {currentPath} = this.state
    const className = currentPath === '/' ? 'orange' : null
    const showSearchInput = currentPath === '/search'
    const popularClassName = currentPath === '/popular' ? 'orange' : null

    return (
      <div className="header-items-space-between">
        <div className="header-items-flex">
          <Link to="/">
            <img
              src="https://res.cloudinary.com/dojn2omox/image/upload/v1701694638/pootp9zemfypdriwlvww.png"
              alt="website logo"
              className="header-image-details"
            />
          </Link>
          <ul className="headers-items-in-flex">
            <Link to="/" className="link-header-details">
              <li className={`header-home-popular ${className}`}>Home</li>
            </Link>
            <Link to="/popular" className="link-header-details">
              <li className={`header-home-popular ${popularClassName}`}>
                Popular
              </li>
            </Link>
          </ul>
        </div>
        <div className="header-items-flex">
          <div className="input-icon-margin-top">
            {showSearchInput && (
              <input
                type="search"
                className="header-input-details"
                placeholder="Search Movie"
                onChange={this.onSearchingInput}
                onKeyDown={this.onEntering}
              />
            )}

            <button
              type="button"
              onClick={this.onClickingIcon}
              testid="searchButton"
              className="search-button-details"
            >
              <Link to="/search">
                <HiOutlineSearch color="white" size="17" />
              </Link>
            </button>
          </div>
          <Link to="/account">
            <button type="button" className="header-profile-button-details">
              <img
                src="https://res.cloudinary.com/dojn2omox/image/upload/v1701411250/sdezb4vmbplxoloudyle.png"
                alt="profile"
                className="profile-image-details"
              />
            </button>
          </Link>
        </div>
      </div>
    )
  }
}

export default Header
