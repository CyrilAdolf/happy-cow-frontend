import React, { useState, useEffect } from "react";
import "./Restaurant.css";
import { useLocation, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Carousel from "react-elastic-carousel";

import GoogleMap from "../../Components/GoogleMap";

// TYPE LOGO
import Vegan from "../../assets/img/category_vegan.svg";
import HealthStore from "../../assets/img/category_health-store.svg";
import Vegetarian from "../../assets/img/category_vegetarian.svg";
import IceCream from "../../assets/img/category_ice-cream.svg";
import JuiceBar from "../../assets/img/category_juice-bar.svg";
import Pro from "../../assets/img/category_professional.svg";
import Bb from "../../assets/img/category_b-b.svg";
import Other from "../../assets/img/category_other.svg";

const Restaurant = ({ ratingfunction }) => {
  const location = useLocation();
  let restaurant = location.state.restaurant;
  const [nearby, setNearby] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // FETCH FOR NEARBY DATA
  useEffect(() => {
    const fetchNearby = async () => {
      try {
        console.log("try request");
        const response = await axios.post(
          `http://localhost:3100/restaurant/nearby`,
          {
            id: restaurant.nearbyPlacesIds,
          }
        );
        setNearby(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchNearby();
  }, [restaurant]);

  const rating = ratingfunction(restaurant);

  const type = restaurant.type;
  let color = "";
  let logoType;
  if (type === "veg-options" || type === "vegan") {
    color = "#22820e";
    logoType = Vegan;
  } else if (type === "Health Store") {
    color = "#B49903";
    logoType = HealthStore;
  } else if (type === "vegetarian") {
    color = "#8A2090";
    logoType = Vegetarian;
  } else if (type === "Ice Cream") {
    color = "#F0447F";
    logoType = IceCream;
  } else if (type === "Juice Bar") {
    color = "#FCB040";
    logoType = JuiceBar;
  } else if (type === "Professional") {
    color = "#016739";
    logoType = Pro;
  } else if (type === "B&B") {
    color = "#2085A2";
    logoType = Bb;
  } else {
    color = "#3875C4";
    logoType = Other;
  }

  // CAROUSEL SETTINGS
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 240, itemsToShow: 2 },
    { width: 480, itemsToShow: 3 },
  ];

  return (
    <>
      <div className="width" style={{ backgroundColor: color }}>
        <div className="container title">
          <div className="columnG">
            <div className="name">{restaurant.name}</div>
            <div className="info">
              <div className="type">
                <img src={logoType} alt="type" />
                <span style={{ color: color }}>{restaurant.type}</span>
              </div>
              <div className="rating">
                {rating.map((elem, i) => {
                  return elem;
                })}
              </div>
              <div>(X reviews)</div>
            </div>
          </div>
          <div className="columnD">
            <div>
              <FontAwesomeIcon icon="pencil-alt" className="icon" /> Update
            </div>
            <div>
              <FontAwesomeIcon icon={["far", "star"]} className="icon" />
              Favorite
            </div>
            <div>
              <FontAwesomeIcon icon="globe-europe" className="icon" />
              Trip
            </div>
            <div>
              <FontAwesomeIcon icon="share-alt" className="icon" />
              Share
            </div>
          </div>
        </div>
      </div>
      {/* START MAIN INFO */}
      <div className="container restaurant">
        <div className="main">
          <div className="location">
            Europe/ France / <span>Paris</span>
          </div>
          <div className="mainInfo">
            <div>
              <FontAwesomeIcon icon="clock" className="icon" />
              <div>
                <span style={{ fontFamily: "NunitoBold" }}>HOURS</span> <br />
                Missing informations
              </div>
            </div>
            <div>
              <FontAwesomeIcon icon="phone-alt" className="icon" />
              <div>
                <span style={{ fontFamily: "NunitoBold" }}>CONTACT</span>
                <br /> {restaurant.phone}
              </div>
            </div>
            <div>
              <FontAwesomeIcon icon="map-marker-alt" className="icon" />
              <div>
                <span style={{ fontFamily: "NunitoBold" }}>FIND</span>
                <br />
                {restaurant.address}{" "}
              </div>
            </div>
          </div>
          <div className="description">{restaurant.description}</div>
          <div className="optionsPhotos">
            <div>
              <div>
                <FontAwesomeIcon icon="pencil-alt" className="icon" /> Add
                Review
              </div>
              <div>
                <FontAwesomeIcon icon="camera" className="icon" />
                Add Photo
              </div>
            </div>
            <div className="numberPhotos">
              {restaurant.pictures.length !== 0
                ? restaurant.pictures.length
                : "1"}{" "}
              photo(s)
              <FontAwesomeIcon icon="camera" className="icon" />
            </div>
          </div>

          <Carousel breakPoints={breakPoints} className="carousel">
            {restaurant.pictures.length !== 0 ? (
              restaurant.pictures.map((photo, i) => {
                return (
                  <img
                    src={photo}
                    alt={`${photo}${i}`}
                    key={i}
                    className="restaurantSlide"
                  />
                );
              })
            ) : (
              <img
                src={restaurant.thumbnail}
                alt={restaurant.name}
                className="restaurantSlide"
              />
            )}
          </Carousel>

          <div className="reviews">
            <div className="titleReview">Reviews</div>
          </div>
        </div>
        <div className="aside">
          <div className="map">
            <GoogleMap
              lat={restaurant.location.lat}
              lng={restaurant.location.lng}
              zoom={14}
              ratingfunction={ratingfunction}
              restaurant={restaurant}
            />
          </div>
          <div className="details">
            <div>
              <div>Features</div>
              <div>
                Reservation required <br /> Wheelchair accessible <br /> accept
                credit cards
              </div>
            </div>
            <div>
              <div>Price</div>
              {restaurant.price ? (
                <div className={restaurant.price}>
                  <FontAwesomeIcon icon="dollar-sign" className="icon" />
                  <FontAwesomeIcon icon="dollar-sign" className="icon" />
                  <FontAwesomeIcon icon="dollar-sign" className="icon" />
                </div>
              ) : (
                "Missing informations"
              )}
            </div>
            <div>
              <div>Website</div>
              <div>{restaurant.website}</div>
            </div>
          </div>
          <div className="restaurant-nearbyListing">
            <div>Nearby Listings</div>
            {isLoading ? (
              <div>LOADING</div>
            ) : nearby.length !== 0 ? (
              nearby.map((restaurant, i) => {
                return (
                  <Link
                    to={{
                      pathname: `/restaurant/${restaurant.placeId}`,
                      state: {
                        restaurant,
                      },
                    }}
                    key={restaurant.placeId}
                  >
                    <div className="restaurant-nearbyRestaurant">
                      <div>
                        <img
                          src={restaurant.thumbnail}
                          alt={restaurant.placeId}
                        />
                      </div>
                      <div>
                        <div className="nearbyRestaurant-name">
                          {restaurant.name}
                        </div>
                        <div className="rating">
                          {ratingfunction(restaurant).map((elem, i) => {
                            return elem;
                          })}
                        </div>
                        <div className="nearbyRestaurant-address">
                          {restaurant.address.split(",")[0]}
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })
            ) : (
              <p>Missing informations</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Restaurant;
