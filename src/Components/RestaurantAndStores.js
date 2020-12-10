import React from "react";
import { Link } from "react-router-dom";

const RestaurantAndStores = () => {
  return (
    <div>
      Restaurants & Stores
      <ul>
        <li>
          <Link to="/">B&B Retreats</Link>
        </li>
        <li>
          <Link to="/">Add a Listing</Link>
        </li>
        <li>
          <Link to="/addRestaurant">Update Listing</Link>
        </li>
        <li>
          <Link to="/">Write Review</Link>
        </li>
        <li>
          <Link to="/">Upgrade My Listing</Link>
        </li>
        {/* <li>
          <Link to={{ pathname: "/search/location" , state: {search: ""}}>Search</Link> 
        </li> */}
        <li>
          <Link to="/">Mobile Version</Link>
        </li>
      </ul>
    </div>
  );
};

export default RestaurantAndStores;
