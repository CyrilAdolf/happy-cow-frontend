import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CardSearchPage = ({ resto, ratingfunction }) => {
  const rating = ratingfunction(resto);

  return (
    <Link
      to={{
        pathname: `/restaurant/${resto.placeId}`,
        state: {
          restaurant: resto,
        },
      }}
      key={resto.placeId}
      className="search-card"
    >
      <img src={resto.thumbnail} alt={resto.placeId} />
      <div className="searchCard-infos">
        <div className="searchCard-name">{resto.name}</div>
        <div className="searchCard-rating">
          {rating.map((elem, i) => {
            return elem;
          })}
        </div>
        <div className="searchCard-price">
          {resto.price ? (
            <div className={resto.price}>
              <FontAwesomeIcon icon="dollar-sign" className="icon" />
              <FontAwesomeIcon icon="dollar-sign" className="icon" />
              <FontAwesomeIcon icon="dollar-sign" className="icon" />
            </div>
          ) : (
            "Missing infos"
          )}
        </div>
      </div>
    </Link>
  );
};

export default CardSearchPage;
