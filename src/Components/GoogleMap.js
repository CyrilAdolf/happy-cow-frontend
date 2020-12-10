import React from "react";
import GoogleMapReact from "google-map-react";

import Marker from "../Components/Marker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Pin = () => {
  return <FontAwesomeIcon icon="map-marker-alt" className="mapMarker" />;
};

const GoogleMap = ({ zoom, ratingfunction, restaurant, lat, lng }) => {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={{
          lat,
          lng,
        }}
        defaultZoom={zoom}
      >
        {restaurant ? (
          <Marker
            restaurant={restaurant}
            ratingfunction={ratingfunction}
            lat={lat}
            lng={lng}
            key={restaurant.placeId}
          />
        ) : (
          <Pin lat={lat} lng={lng} />
        )}
      </GoogleMapReact>
    </div>
  );
};

export default GoogleMap;
