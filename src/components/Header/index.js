import {withRouter, Link} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <>
      <nav className="nav-container">
        <ul className="all-list">
          <li className="logo-li">
            <Link to="/">
              <img
                src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
                className="website-logo"
                alt="website logo"
              />
            </Link>
          </li>
          <li className="list-card">
            <Link to="/">
              <p className="links-text">Home</p>
            </Link>
            <Link to="/jobs">
              <p className="links-text">Jobs</p>
            </Link>
          </li>
          <li className="logo-li">
            <button
              className="logout-button"
              type="button"
              onClick={onClickLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </>
  )
}
export default withRouter(Header)
