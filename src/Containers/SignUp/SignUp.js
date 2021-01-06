import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import "./signUp.css";

import PicSignup from "../../assets/img/signup.jpg";
import LoadingCard from "../../Components/LoadingCard/LoadingCard";
import GoogleMap from "../../Components/GoogleMap";

const SignUp = ({ setSignUp, setUserConnect }) => {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setpassword] = useState("");
  const [veganStatus, setVeganStatus] = useState("");
  const [birth, setBirth] = useState("");
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [newsletter, setNewsletter] = useState(true);

  // ARRAY TO MAP OVER FOR YEAR SELECT INPUT
  const year = new Date().getFullYear();
  let years = [];
  for (let i = 1950; i <= year - 13; i++) {
    years.unshift(Number(i));
  }

  // SET COORDS FOR MAP
  useEffect(() => {
    const getPosition = (position) => {
      // console.log(position.coords.latitude, position.coords.longitude);
      setLat(position.coords.latitude);
      setLng(position.coords.longitude);
    };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getPosition);
    }
  }, [setLat, setLng]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (agreeTerms) {
      const location = [lat, lng];
      try {
        const response = await axios.post(
          "https://happy-cow-ca.herokuapp.com/user/signup",
          {
            email,
            username,
            password,
            location,
            veganStatus,
            birth,
            newsletter,
          }
        );
        console.log(response.data);
        setUserConnect(response.data);
        alert("Registration succeeded !!");
        // REDIRECT HOME
        history.push("/");
      } catch (error) {
        console.log(error.message);
        alert("An error occured during your registration...");
      }
    } else {
      alert("You need to accept privacy terms to register on HappyCow");
    }
  };
  return (
    <div className="signup">
      <div className="picture">
        <img src={PicSignup} alt="communityPicture" />{" "}
      </div>
      <div className="formularSignUp">
        <div className="formTitle">
          Join the largest vegan and vegetarian community in the world
        </div>
        {/* <div className="socialNetwork">
          <div>Facebook</div>
          <div>Google</div>
          <div>Apple</div>
        </div> */}
        <form className="formSignup">
          <div className="line1">
            <div>
              Username
              <input
                type="username"
                onChange={(event) => setUsername(event.target.value)}
                value={username}
                placeholder="Username"
              />
            </div>
            <div>
              Password
              <input
                type="password"
                onChange={(event) => setpassword(event.target.value)}
                value={password}
                placeholder="Password"
              />
            </div>
          </div>

          <div className="line2">
            Email
            <input
              type="email"
              onChange={(event) => setEmail(event.target.value)}
              value={email}
              placeholder="email"
            />
          </div>

          <div className="line1">
            <div>
              Veg Status
              <select
                name="veganStatus"
                onChange={(event) => {
                  setVeganStatus(event.target.value);
                }}
              >
                <option value="vegan">Vegan</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="raw">Raw</option>
                <option value="mostlyVeg">MostlyVeg</option>
                <option value="nonVeg">Non Veg</option>
                <option value="herbivore">Herbivore</option>
                <option value="fruitarian">Fruitarian</option>
              </select>
            </div>
            <div>
              Birth Year
              <select
                name="year"
                onChange={(event) => {
                  setBirth(event.target.value);
                }}
              >
                <option defaultValue>Year</option>
                {years.map((year, i) => {
                  return (
                    <option key={i} value={year}>
                      {year}
                    </option>
                  );
                })}
              </select>
              <span style={{ fontFamily: "Nunito", fontSize: 12 }}>
                Used to confirm you are over 13 years old
              </span>
            </div>
          </div>

          <div className="line2">
            Your Home City
            <input
              type="text"
              placeholder="Auto complete isn't available for now"
            />
            <span style={{ fontFamily: "Nunito", fontSize: 12 }}>
              Publicly displayed on profile and used to introduce you to nearby
              restaurants. (examples: "Los Angeles, California" or "Paris,
              France") <br /> Enter your location in the box above and click
              "Set location". If marker below isn't right, drag to correct.
            </span>
          </div>

          <div className="map">
            {lat && lng ? (
              <GoogleMap zoom={11} lat={lat} lng={lng} />
            ) : (
              <LoadingCard />
            )}
          </div>

          <div className="questions">
            <span>
              I agree to the Terms of Use and Privacy Policy and default
              notifications settings. I am 13+ years old.
            </span>
            <div>
              <div
                onClick={() => {
                  setAgreeTerms(true);
                }}
                className={agreeTerms ? "bold" : "regular"}
              >
                I agree
              </div>
              <div
                onClick={() => {
                  setAgreeTerms(false);
                }}
                className={!agreeTerms ? "bold" : "regular"}
              >
                I don't agree
              </div>
            </div>
          </div>

          <div className="questions">
            <span>
              Get updates on now openings, vegan products, and local specials
              near you.
            </span>
            <div>
              <div
                onClick={() => {
                  setNewsletter(true);
                }}
                className={newsletter ? "bold" : "regular"}
              >
                YES, please
              </div>
              <div
                onClick={() => {
                  setNewsletter(false);
                }}
                className={!newsletter ? "bold" : "regular"}
              >
                No
              </div>
            </div>
          </div>

          <span className="policy">
            We never sell your info or let other companies use it. You may
            adjust settings later via your profile on the website.
          </span>

          <input
            type="submit"
            className="registerButton"
            value="Register"
            onClick={(event) => {
              handleSubmit(event);
            }}
          />
        </form>
      </div>
    </div>
  );
};

export default SignUp;
