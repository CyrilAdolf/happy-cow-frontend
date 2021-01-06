import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const ButtonIfToken = ({ setUserConnect }) => {
  return (
    <>
      <Link to={{ pathname: "/search/location", state: { search: "75001" } }}>
        <FontAwesomeIcon icon="search" className="icon" />
      </Link>
      <Link to="/addRestaurant">Add Listing</Link>
      <Link to="/profile">My Profile</Link>
      <Link to="/" onClick={() => setUserConnect(null)}>
        Disconnect
      </Link>
    </>
  );
};

export default ButtonIfToken;
