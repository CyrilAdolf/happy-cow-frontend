import React, { useState } from "react";
import "./assets/css/fonts.css";
import "./assets/css/App.css";
import Cookie from "js-cookie";

// IMPORT NAVIGATION
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// IMPORT CONTAINERS/COMPONENTS
import Home from "./Containers/Home/Home";
import Restaurant from "./Containers/Restaurant/Restaurant";
import Search from "./Containers/Search/Search";
import AddRestaurant from "./Containers/AddRestaurant/AddRestaurant";
import Profile from "./Containers/Profile/Profile";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import SignIn from "./Components/SignIn/SignIn";
import SignUp from "./Containers/SignUp/SignUp";

// FONTAWESOME LIBRARY
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSearch,
  faMapMarkerAlt,
  faDollarSign,
  faStar,
  faStarHalfAlt,
  faPencilAlt,
  faGlobeEurope,
  faShareAlt,
  faPhoneAlt,
  faClock,
  faCamera,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as faEmptyStar } from "@fortawesome/free-regular-svg-icons";
library.add(
  faSearch,
  faMapMarkerAlt,
  faDollarSign,
  faStar,
  faStarHalfAlt,
  faEmptyStar,
  faPencilAlt,
  faGlobeEurope,
  faShareAlt,
  faPhoneAlt,
  faClock,
  faCamera
);

function App() {
  const [signIn, setSignIn] = useState(false);
  const [token, setToken] = useState(Cookie.get("userToken") || null);
  const [userId, setUserId] = useState(Cookie.get("userId" || null));

  const setUserConnect = (data) => {
    if (data && data.token) {
      // CONNECTION = CREATE A TOKEN AND SO A COOKIE
      Cookie.set("userToken", data.token, { expires: 15 });
      setToken(data.token);
    } else {
      // DISCONNECTION = REMOVE COOKIE AND TOKEN
      Cookie.remove("userToken");
      setToken(null);
    }

    if (data && data._id) {
      Cookie.set("userId", data._id, { expires: 15 });
      setUserId(data._id);
    } else {
      Cookie.remove("userId");
      setUserId(null);
    }
  };

  // STAR RATING
  const ratingfunction = (restaurant) => {
    const rate = restaurant.rating;
    let rating = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rate) {
        rating.push(<FontAwesomeIcon icon="star" className="icon" key={i} />);
      } else {
        rating.push(
          <FontAwesomeIcon icon={["far", "star"]} className="icon" key={i} />
        );
      }
    }
    if (!Number.isInteger(rate)) {
      const x = Math.floor(rate);
      rating[x] = (
        <FontAwesomeIcon icon="star-half-alt" className="icon" key={x + 1} />
      );
    }
    return rating;
  };

  return (
    <Router>
      <Header
        setSignIn={setSignIn}
        token={token}
        setUserConnect={setUserConnect}
      />
      <Switch>
        <Route path="/restaurant/:id">
          <Restaurant ratingfunction={ratingfunction} />
        </Route>
        <Route path="/search/location">
          <Search ratingfunction={ratingfunction} />
        </Route>
        <Route path="/addRestaurant">
          <AddRestaurant />
        </Route>
        <Route path="/profile">
          <Profile userId={userId} token={token} />
        </Route>
        <Route path="/signUp">
          <SignUp setUserConnect={setUserConnect} />
        </Route>
        <Route path="/">
          <Home ratingfunction={ratingfunction} />
        </Route>
      </Switch>
      <Footer />
      {signIn && (
        <SignIn setSignIn={setSignIn} setUserConnect={setUserConnect} />
      )}
    </Router>
  );
}

export default App;
