import React from "react";
import Geocode from "react-geocode";

const GeoCode = () => {
  // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
  Geocode.setApiKey("AIzaSyDwtU5tjfg70GuDGiBUMQO3c - lOhtAif1g");

  // set response language. Defaults to english.
  Geocode.setLanguage("en");

  // set response region. Its optional.
  // A Geocoding request with region=es (Spain) will return the Spanish city.
  Geocode.setRegion("en");

  // Enable or disable logs. Its optional.
  Geocode.enableDebug();

  // Get address from latitude & longitude.
  Geocode.fromLatLng("48.8583701", "2.2922926").then(
    (response) => {
      const address = response.results[0].formatted_address;
      console.log(address);
    },
    (error) => {
      console.error(error);
    }
  );
  // Get latitude & longitude from address.
  Geocode.fromAddress("Eiffel Tower").then(
    (response) => {
      const { lat, lng } = response.results[0].geometry.location;
      console.log(lat, lng);
    },
    (error) => {
      console.error(error);
    }
  );
  Geocode.fromAddress("Eiffel Tower");
  return <div></div>;
};

export default GeoCode;
