import React from "react";

const Card = ({ restaurant, ratingfunction }) => {
  const rating = ratingfunction(restaurant);
  return (
    <div className="card">
      <div className="picture">
        <img src={restaurant.thumbnail} alt={restaurant.name} />
      </div>
      <div className="name">
        {/* INSERT LOGO HERE */}
        {/* INSERT LOGO HERE */}
        {restaurant.name}
      </div>
      <div className="location">{restaurant.address}</div>
      <div className="rating">
        <div>
          {rating.map((elem, i) => {
            return elem;
          })}
        </div>
        <div>7 reviews</div>
      </div>
      <div className="description">{restaurant.description}</div>
    </div>
  );
};

export default Card;
