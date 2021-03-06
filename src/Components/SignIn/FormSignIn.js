import React, { useState } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";

const FormSignIn = ({ setSignIn, setUserConnect }) => {
  // STATES
  const [email, setEmail] = useState("test@test.com");
  // const [username, setUsername] = useState("");
  const [password, setpassword] = useState("azerty");

  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://happy-cow-ca.herokuapp.com/user/signin",
        {
          email,
          password,
        }
      );
      // console.log(response.data);
      setUserConnect(response.data);
      setSignIn(false);
      // REDIRECT
      history.push("/");
      alert("Successfully logged in!!");
    } catch (error) {
      console.log(error.message);
      alert("An error occured, you're not logged in");
    }
  };

  return (
    <form className="form">
      <div className="titleSignIn">Login to Your Account</div>
      <div>
        Email:
        <input
          type="email"
          onChange={(event) => setEmail(event.target.value)}
          value={email}
          placeholder="email"
        />
      </div>
      <div>
        Password:
        <input
          type="password"
          onChange={(event) => setpassword(event.target.value)}
          value={password}
          placeholder="password"
        />
      </div>
      <input
        type="submit"
        value="Login"
        onClick={(event) => {
          handleSubmit(event);
        }}
      />
      <div style={{ color: "#7c4ec3", textAlign: "center" }}>
        Reset Password
      </div>
      <div id="cut">
        <div></div>
        <span>OR</span>
        <div></div>
      </div>
      <Link
        to="/SignUp"
        onClick={() => {
          setSignIn(false);
        }}
        className="toRegister"
      >
        REGISTER
      </Link>
    </form>
  );
};

export default FormSignIn;
