import React from 'react'
import HeaderLogo from './HeaderLogo'

const Header = () => {
  return (
    <header className="header header-1">
      <div className="container">
        <div className="header__wrapper">
          <HeaderLogo logoPath={'assets/images/footer-logo.png'} />
          {/* TODO header nav */}
          <div className="header__bars">
            <div className="header__bars-bar header__bars-bar-1" />
            <div className="header__bars-bar header__bars-bar-2" />
            <div className="header__bars-bar header__bars-bar-3" />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
