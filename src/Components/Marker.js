import React from "react";
import { Link } from "react-router-dom";

// TYPE LOGO
import Vegan from "../assets/img/category_vegan.svg";
import HealthStore from "../assets/img/category_health-store.svg";
import Vegetarian from "../assets/img/category_vegetarian.svg";
import IceCream from "../assets/img/category_ice-cream.svg";
import JuiceBar from "../assets/img/category_juice-bar.svg";
import Pro from "../assets/img/category_professional.svg";
import Bb from "../assets/img/category_b-b.svg";
import Other from "../assets/img/category_other.svg";

const Marker = ({ restaurant, ratingfunction }) => {
  const type = restaurant.type;
  let logoType;
  if (type === "veg-options" || type === "vegan") {
    logoType = Vegan;
  } else if (type === "Health Store") {
    logoType = HealthStore;
  } else if (type === "vegetarian") {
    logoType = Vegetarian;
  } else if (type === "Ice Cream") {
    logoType = IceCream;
  } else if (type === "Juice Bar") {
    logoType = JuiceBar;
  } else if (type === "Professional") {
    logoType = Pro;
  } else if (type === "B&B") {
    logoType = Bb;
  } else {
    logoType = Other;
  }

  return (
    type && (
      <Link
        to={{
          pathname: `/restaurant/${restaurant.placeId}`,
          state: {
            restaurant,
          },
        }}
        key={restaurant.placeId}
        className="searchPage-marker"
      >
        <div className="marker-detailArea">
          <div className="marker-picture">
            <img src={restaurant.thumbnail} alt={restaurant.placeId} />
          </div>
          <div className="marker-name">{restaurant.name}</div>
          <div className="marker-rating">
            {ratingfunction(restaurant).map((elem, i) => {
              return elem;
            })}
          </div>
          <div className="marker-address">{restaurant.address}</div>
          <div></div>
          <div></div>
        </div>
        <img src={logoType} alt="type" />
      </Link>
    )
  );
};

export default Marker;
