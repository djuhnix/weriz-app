import React from "react";
import {} from "../../components/footer/FooterList";

export interface LoginProps {

}

export const Login: React.FC<LoginProps> = (
  {}
) => {
  return (
    <section className="newsletter newsletter-2">
      <div className="newsletter__wrapper">
        <div className="container">
          <div className="row align-items-lg-center">
            <div className="col-lg-8">
              <div className="newsletter__info">
                <h2 className="section-heading color-black">Se connecter avec son adresse email</h2>
                <div className="comment_form">
                  <div>
                    <input type="text" placeholder="Email *" className="input-field" />
                    <input type="password" placeholder="Password *" className="input-field" />
                  </div>
                  <div>
                    <button className="button">
                      <span>Se connecter <i className="fad fa-long-arrow-right"/></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
};