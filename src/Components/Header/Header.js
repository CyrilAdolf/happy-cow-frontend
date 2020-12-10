import React from "react";
import Logo from "../../assets/img/logoHeader.svg";
import "./header.css";

import { Link } from "react-router-dom";

import RestaurantAndStores from "../RestaurantAndStores";
import VegTopics from "../VegTopics";
import ButtonIfToken from "../ButtonIfToken";
import ButtonIfNoToken from "../ButtonIfNoToken";

const Header = ({ setSignIn, setUserConnect, token }) => {
  return (
    <div className="header">
      <div className="navigation">
        <Link to="/" className="logo">
          <img src={Logo} alt="HappyCow logo" />
        </Link>
        <RestaurantAndStores />
        <VegTopics />
        <div>Community</div>
        <div>Blog</div>
        <div>Feed the Cow</div>
      </div>
      <div className="buttons">
        {token ? (
          <ButtonIfToken setUserConnect={setUserConnect} />
        ) : (
          <ButtonIfNoToken setSignIn={setSignIn} />
        )}
      </div>
    </div>
  );
};

export default Header;
