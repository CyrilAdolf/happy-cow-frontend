import React, { useState, useEffect } from "react";
import "./search.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import GoogleMap from "google-map-react";

import SearchBar from "../../Components/SearchBar/SearchBar";
import CardSearchPage from "../../Components/CardSearchPage";
// import MyMapComponent from "../../Components/MyMapComponent";
import Marker from "../../Components/Marker";

const Search = ({ ratingfunction }) => {
  const location = useLocation();
  const [searchData, setSearchData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // console.log(location);
  // const useQuery = () => {
  //   return new URLSearchParams(useLocation().search);
  // };
  // let query = useQuery();
  // console.log("query : ", query.get("search"));
  // const test = query.get("search");

  useEffect(() => {
    if (location.state.search) {
      const fetchData = async () => {
        try {
          const response = await axios.post(
            `http://localhost:3100/searchbar?location=${location.state.search}`
          );
          console.log(response.data);
          setSearchData(response.data);
          setIsLoading(false);
        } catch (error) {
          console.log(error.message);
        }
      };
      fetchData();
    }
  }, [location.state.search]);

  // IN THIS CASE LAT AND LNG AREN'T DYNAMIC VALUES
  let lat = 48.85837;
  let lng = 2.294481;

  return isLoading ? (
    <div>Chargement</div>
  ) : (
    <div className="searchPage">
      <div className="searchResults">
        <div className="search-header">
          {searchData && (
            <div className="search-numberOfResults">
              We found {searchData.length} results for "
              <span style={{ fontFamily: "NunitoBold" }}>
                {location.state.search}
              </span>
              "
            </div>
          )}
          <div className="search-searchBar">
            <SearchBar initialSearch={location.state.search} />
          </div>
          <div className="search-filters">FILTERS HERE</div>
        </div>
        <div className="search-results">
          {searchData.map((resto, i) => {
            return (
              <CardSearchPage
                key={resto.placeId}
                resto={resto}
                ratingfunction={ratingfunction}
              />
            );
          })}
        </div>
        <div className="search-FAQ"></div>
      </div>
      <div className="searchMap">
        {/* SWITCH IT TO MAPS */}
        {/* SWITCH IT TO MAPS */}
        {/* SWITCH IT TO MAPS */}
        {/* <MyMapComponent lat={lat} lng={lng} zoom={12} /> */}
        <GoogleMap
          bootstrapURLKeys={{
            key: process.env.REACT_APP_GOOGLE_MAPS_KEY,
          }}
          defaultCenter={{
            lat: lat,
            lng: lng,
          }}
          defaultZoom={12}
        >
          {searchData.map((restaurant, i) => {
            // MARKER
            return (
              <Marker
                key={restaurant.placeId}
                restaurant={restaurant}
                lat={restaurant.location.lat}
                lng={restaurant.location.lng}
                ratingfunction={ratingfunction}
              />
            );
          })}
        </GoogleMap>
      </div>
    </div>
  );
};

export default Search;
