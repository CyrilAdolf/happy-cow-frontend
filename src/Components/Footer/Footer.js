import React from "react";
import "./footer.css";
// import Github from "../Assets/img/Github.png";
// import linkedin from "../Assets/img/linkedin.png";

const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        Made with&nbsp;<span>React&nbsp;</span>at&nbsp;
        <span>
          <a
            href="http://www.lereacteur.io"
            rel="noopener noreferrer"
            target="_blank"
          >
            LeReacteur&nbsp;
          </a>
        </span>
        by&nbsp;
        <span>
          <a
            href="https://github.com/CyrilAdolf"
            rel="noopener noreferrer"
            target="_blank"
          >
            Cyril
          </a>
          {/* NOT WORKING SO FAR */}

          {/* <a href="https://www.linkedin.com/in/cyril-adolf-aab3861b7/">
          <img src={linkedin} alt="" />
          </a>
          <a href="https://github.com/CyrilAdolf">
          <img src={github} alt="" />
        </a> */}
        </span>
      </div>
    </div>
  );
};

export default Footer;
