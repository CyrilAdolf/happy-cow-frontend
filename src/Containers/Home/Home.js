import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Carousel from "react-elastic-carousel";

import "./home.css";

// COMPONENT
import SearchBar from "../../Components/SearchBar/SearchBar";
import Card from "../../Components/Card";
import LoadingCard from "../../Components/LoadingCard/LoadingCard";

const Home = ({ ratingfunction }) => {
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  // lat AND lng PARAMETERS COULD BE USED FOR REQUEST
  // console.log("lat : ", lat, "lng : ", lng);

  const [isLoading, setIsLoading] = useState(true);
  const [restaurants, setRestaurants] = useState();
  const [isLoading2, setIsLoading2] = useState(true);

  // FETCH LOCATION IS NOT ACTIVATE
  useEffect(() => {
    const getPosition = (position) => {
      setLat(position.coords.latitude);
      setLng(position.coords.longitude);
      setIsLoading(false);
    };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getPosition);
    }
  }, [setLat, setLng]);

  // REQUEST TO GET RESTAURANTS DATA
  useEffect(() => {
    if (!isLoading) {
      const fetchdata = async () => {
        const response = await axios.get(
          `https://happy-cow-ca.herokuapp.com/aroundme?lat=${48.85837}&lng=${2.294481}&limit=${10}&skip=${0}`
        );
        // console.log(response.data);
        setRestaurants(response.data);
        setIsLoading2(false);
      };
      fetchdata();
    }
  }, [isLoading]);

  // CAROUSEL SETTINGS
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 300, itemsToShow: 2 },
    { width: 600, itemsToShow: 3 },
    { width: 900, itemsToShow: 4 },
  ];

  return (
    <div className="homePage">
      <div className="wavy">
        <div>Find Vegan Restaurants Nearby</div>
        <SearchBar />

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 130 1440 190">
          <path
            fill="#ffffff"
            fill-opacity="1"
            d="M0,256L80,261.3C160,267,320,277,480,266.7C640,256,800,224,960,218.7C1120,213,1280,235,1360,245.3L1440,256L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></path>
        </svg>
      </div>
      <div className="container">
        <div className="sectionTitle">Vegan Food Near Me Exemple</div>

        {isLoading2 ? (
          <Carousel breakPoints={breakPoints} className="homeCarousel">
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
          </Carousel>
        ) : (
          <Carousel breakPoints={breakPoints} className="homeCarousel">
            {restaurants.map((restaurant, i) => {
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
                  <Card
                    restaurant={restaurant}
                    ratingfunction={ratingfunction}
                    key={restaurant.placeId}
                  />
                </Link>
              );
            })}
          </Carousel>
        )}

        <div className="sectionTitle">Vegan Delivery Nearby</div>
        <div>Coming soon ..</div>
      </div>
    </div>
  );
};

export default Home;
