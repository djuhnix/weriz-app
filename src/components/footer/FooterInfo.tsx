import React from "react";

export const FooterInfo = () => {
  return <div className="footer__info">
    <div className="footer__info--logo">
      <img src="assets/images/footer-logo.png" alt="image" />
    </div>
    <div className="footer__info--content">
      <p className="paragraph dark">
        Zapper is an app that helps you
        organize yourself on the daily basis
        using systematic algorithms to
        achieve success.</p>
      <div className="social">
        <ul>
          <li className="facebook"><a href="#"><i className="fab fa-facebook-f"/></a></li>
          <li className="twitter"><a href="#"><i className="fab fa-twitter"/></a></li>
          <li className="linkedin"><a href="#"><i className="fab fa-linkedin-in"/></a></li>
          <li className="youtube"><a href="#"><i className="fab fa-youtube"/></a></li>
        </ul>
      </div>
    </div>
  </div>;
}