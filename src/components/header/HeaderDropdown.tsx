import React from 'react';
import {Link} from "react-router-dom";

interface DropdownLink {
  title: string;
  path: string;
}

interface IProps {
  title: string;
  links: DropdownLink[]
}

function renderPath(paths: DropdownLink[]) {
  return (
    <ul className="nav__dropdown-box dropdown-box">
      {paths.map((value, index) => (
        <li>
          <Link to={value.path}>{value.title}</Link>
        </li>
      ))}
    </ul>
  )
}

const HeaderDropdown = (props: IProps) => {
  const { title, links } = props
  return (
    <li className="nav__dropdown dropdown-wrapper" id="menu-1">
      <Link to="#" className="nav__dropdown-info dropdown-info">
        { title }
      </Link>
      {renderPath(links)}
    </li>
  );
};

export default HeaderDropdown;