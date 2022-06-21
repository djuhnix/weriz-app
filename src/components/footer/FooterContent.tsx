import React from 'react'
import { FooterLink } from './Footer'

interface FooterContentProps {
  footerList: [
    {
      title: string
      links: FooterLink
    },
  ]
}

export const FooterContent: React.FC<FooterContentProps> = () => {
  return (
    <div className="footer__content-wrapper">
      {/* FooterList */}

      <div className="download-buttons">
        <h5>Download</h5>
        <a href="#" className="google-play">
          <i className="fab fa-google-play" />
          <div className="button-content">
            <h6>
              GET IT ON <span>Google Play</span>
            </h6>
          </div>
        </a>
        <a href="#" className="apple-store">
          <i className="fab fa-apple" />
          <div className="button-content">
            <h6>
              GET IT ON <span>Apple Store</span>
            </h6>
          </div>
        </a>
      </div>
    </div>
  )
}
