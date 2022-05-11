import React from 'react'
import { FooterInfo } from './FooterInfo'

export interface FooterLink {
  label: string
  path: string
}

interface IProps {}

const Footer = (props: IProps) => {
  return (
    <footer className="footer">
      <div className="footer__wrapper">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <FooterInfo />
            </div>
            <div className="col-lg-8">{/*<FooterContent/>*/}</div>
          </div>
          <div className="row">
            <div className="footer__copy">
              <h6>&copy; djuhnix</h6>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
