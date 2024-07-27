import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="standard__bg p-2 mt-2 text-center">
        <div className="footer">
          <div className="footer__heading">
          <p
              className="gradient_text mb-0"
              style={{
                fontWeight: 1000,
              }}
            >
              ELDash Movies
            </p>
            <p
              className="gradient_text_footer mb-0"
              style={{
                fontWeight: 1000,
              }}
            >
              Created By: Hassan ELDash
            </p>
          </div>
          <div className="footer__icons">
            <a href={"https://www.linkedin.com/in/hassaneldash/"} target="_blank" rel="noopener noreferrer">
              <i class="fab fa-linkedin col col-lg-1"></i>
              {/* <FontAwesomeIcon icon="fa-brands fa-linkedin" /> */}
            </a>
            <a href={"https://github.com/hassaneldash"} target="_blank" rel="noopener noreferrer">
              {/* <FontAwesomeIcon icon="fa-brands fa-github" /> */}
              <i class="fab fa-github col col-lg-1"></i>
            </a>
            <a href={"https://twitter.com/Hassan_ELDash/"} target="_blank" rel="noopener noreferrer">
              {/* <FontAwesomeIcon icon="fa-brands fa-x-twitter" /> */}
              <i class="fab fa-x-twitter col col-lg-1"></i>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
