import React from 'react';
import {Link} from "react-router-dom";

interface NavLink {
  title: string;
  path: string;
}

interface IProps {
  linksPath: string[];
  displayHome?: boolean;
  links: NavLink[];
}

function shouldDisplayHomeIcon(displayHome: boolean = true) {
  if (displayHome) {
    return <li>
      <Link to="/"><i className="fad fa-home-alt"/></Link>
    </li>
  }
}

const HeaderNav = (props: IProps) => {
  const {displayHome, links} = props;
  return (
    <div className="header__nav">
      <ul className="header__nav-primary">
        {shouldDisplayHomeIcon(displayHome)}
        {links.map((value, index) => (
          <li>
            <Link to={value.path}>{value.title}</Link>
          </li>
        ))}
      </ul>
      <span><i className="fas fa-times"/></span>
    </div>
  );
};

export default HeaderNav;