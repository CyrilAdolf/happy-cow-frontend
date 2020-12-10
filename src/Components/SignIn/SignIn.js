import React from "react";
import "./signIn.css";

import LinkApple from "../../assets/img/signInApple.png";
import LinkAndroid from "../../assets/img/signInAndroid.png";

import FormSignIn from "./FormSignIn";
import PictureSignIn from "../../assets/img/signin.jpg";

const SignIn = ({ setSignIn, setUserConnect }) => {
  return (
    <div className="modal">
      <div className="formularSignIn">
        <div className="signInHeader">
          <p>
            We see you love HappyCow, why not login or register or get the app
            to view without limitations.
          </p>
          <div>
            <img src={LinkApple} alt="linkApple" className="appLink" />
            <img src={LinkAndroid} alt="linkAndroid" className="appLink" />
          </div>
        </div>
        <div className="mainSignIn">
          <FormSignIn setSignIn={setSignIn} setUserConnect={setUserConnect} />
          <div
            className="rightColumn"
            style={{ backgroundImage: `url(${PictureSignIn})` }}
          >
            <div className="social">Facebook</div>
            <div className="social">Google</div>
            <div className="social">Apple</div>
          </div>
        </div>
        <div className="exit-modal" onClick={() => setSignIn(false)}>
          X
        </div>
      </div>
    </div>
  );
};

export default SignIn;
