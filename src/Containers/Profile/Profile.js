import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./profile.css";

const Profile = ({ userId, token }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [birth, setBirth] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [newsletter, setNewsletter] = useState(true);
  const [veganStatus, setVeganStatus] = useState("");
  const [avatar, setAvatar] = useState("");
  const [file, setFile] = useState("pas encore défini");

  // ARRAY TO MAP OVER FOR YEAR SELECT INPUT
  const year = new Date().getFullYear();
  let years = [];
  for (let i = 1950; i <= year - 13; i++) {
    years.unshift(Number(i));
  }

  // fetchdata profile data
  useEffect(() => {
    const fetchProfile = async () => {
      // console.log("requete go");
      const response = await axios.post(
        "https://happy-cow-ca.herokuapp.com/user/profile",
        {
          _id: userId,
        }
      );
      setUsername(response.data.account.username);
      setEmail(response.data.email);
      setAvatar(response.data.account.avatar);
      setBirth(response.data.account.birth);
      setLat(response.data.account.location.lat);
      setLng(response.data.account.location.lng);
      setVeganStatus(response.data.account.veganStatus);
      // NEWSLETTER IS NOT FETCH, WE SET IT TO TRUE BY DEFAULT
      console.log("status : ", response.status);
      console.log("response : ", response);
      if (response.status === 200) {
        alert("Your profile has been updated successfully.");
      } else {
        alert("An error occured, your profile has not been updated.");
      }
    };
    fetchProfile();
  }, [userId]);

  // NEEDED BECAUSE WE WANT TO UPDATE THE AVATAR
  const formData = new FormData();
  formData.append("email", email);
  formData.append("username", username);
  formData.append("veganStatus", veganStatus);
  formData.append("birth", birth);
  formData.append("newsletter", newsletter);
  formData.append("lat", lat);
  formData.append("lng", lng);
  formData.append("avatar", file);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("token : ", token);

    const response = await axios.post(
      "https://happy-cow-ca.herokuapp.com/user/updateprofile",
      formData,
      {
        headers: {
          authorization: token,
        },
      }
    );
    console.log(response.data);
    setUsername(response.data.username);
    setEmail(response.data.email);
    setAvatar(response.data.avatar);
    setBirth(response.data.birth);
    setLat(response.data.lat);
    setLng(response.data.lng);
    setVeganStatus(response.data.veganStatus);
    setNewsletter(response.data.newsletter);
    alert("SUCCESS !! Your profile has been updated !");
  };

  return (
    <div className="profilePage">
      <div>
        <form
          onSubmit={(event) => {
            handleSubmit(event);
          }}
        >
          <div className="profile-avatar">
            <img src={avatar} alt="user avatar" />
            <div>
              <label for="file-input">
                <FontAwesomeIcon icon="camera" className="icon" />
              </label>
              <input
                id="file-input"
                className="avatar-update"
                type="file"
                onChange={(event) => {
                  setFile(event.target.files[0]);
                }}
              ></input>
            </div>
          </div>
          <div className="profile-inputs">
            <div className="profile-username">
              <span>Username :</span>
              <input
                type="text"
                value={username}
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
                placeholder="Usernamen"
              />
            </div>

            <div className="profile-email">
              <span>Email :</span>
              <input
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                placeholder="Email"
              />
            </div>

            <div className="profile-location">
              <span>lat :</span>
              <input
                type="text"
                value={lat}
                onChange={(event) => {
                  setLat(event.target.value);
                }}
                placeholder="Latitude"
              />
              <br />
              <span>lng :</span>
              <input
                type="text"
                value={lng}
                onChange={(event) => {
                  setLng(event.target.value);
                }}
                placeholder="Longitude"
              />
            </div>

            <div className="profile-birth">
              <span>Birth :</span>
              <select
                name="year"
                onChange={(event) => {
                  setBirth(event.target.value);
                }}
              >
                <option defaultValue>{birth}</option>
                {years.map((year, i) => {
                  return (
                    <option key={i} value={year}>
                      {year}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="profile-vegStatus">
              <span>Vegan Status :</span>
              <select
                name="veganStatus"
                onChange={(event) => {
                  setVeganStatus(event.target.value);
                }}
                value={veganStatus}
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
            <div className="profile-newsletter">
              <span>Newsletter :</span>
              <div>
                <div
                  onClick={() => {
                    setNewsletter(true);
                  }}
                  className={newsletter ? "bold" : "regular"}
                >
                  Yes, please
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
            <div>
              <button>Update</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
