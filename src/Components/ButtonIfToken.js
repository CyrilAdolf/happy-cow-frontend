import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const ButtonIfToken = ({ setUserConnect }) => {
  return (
    <>
      <div>
        <FontAwesomeIcon icon="search" className="icon" />
      </div>
      <Link to="/addRestaurant">Add Listing</Link>
      <Link to="/profile">My Profile</Link>
      <Link to="/" onClick={() => setUserConnect(null)}>
        Disconnect
      </Link>
    </>
  );
};

export default ButtonIfToken;
