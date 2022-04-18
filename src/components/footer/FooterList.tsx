import React from "react";
import {FooterLink} from "./Footer";


export interface FooterListProps {
  title: string;
  links: FooterLink[]
}

export const FooterList: React.FC<FooterListProps> = (
  {title, links}
) => {
  return <div className="footer__list">
    <ul>
      <li>{title}</li>
      {links.map(link => <li><a href={link.path}>{link.path}</a></li>)}
    </ul>
  </div>;
}