import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const ButtonIfNoToken = ({ setSignIn }) => {
  return (
    <>
      <div>
        <FontAwesomeIcon icon="search" className="icon" />
      </div>
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
