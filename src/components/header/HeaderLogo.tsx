import React from 'react'
import { Link } from 'react-router-dom'

interface IProps {
  logoPath: string // "assets/images/footer-logo.png"
}

function HeaderLogo(props: IProps) {
  return (
    <div className="header__logo">
      <Link to="/">
        <img src={props.logoPath} alt="logo" />
      </Link>
    </div>
  )
}

export default HeaderLogo
