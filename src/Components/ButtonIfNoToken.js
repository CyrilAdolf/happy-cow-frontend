import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const ButtonIfNoToken = ({ setSignIn }) => {
  return (
    <>
      <Link to={{ pathname: "/search/location", state: { search: "75001" } }}>
        <FontAwesomeIcon icon="search" className="icon" />
      </Link>
      <Link to="/" onClick={() => setSignIn(true)}>
        Add Listing
      </Link>

      <Link to="/" onClick={() => setSignIn(true)}>
        Login/Join
      </Link>
    </>
  );
};

export default ButtonIfNoToken;
