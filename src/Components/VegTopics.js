import React from "react";
import { Link } from "react-router-dom";

const VegTopics = () => {
  return (
    <div>
      Veg Topics
      <ul>
        <li>
          <Link to="/">Forum</Link>
        </li>
        <li>
          <Link to="/">Recipes</Link>
        </li>
        <li>
          <Link to="/">Travel</Link>
        </li>
        <li>
          <Link to="/">Health</Link>
        </li>
        <li>
          <Link to="/">Going Vegan</Link>
        </li>
        <li>
          <Link to="/">Veg Protein</Link>
        </li>
        <li>
          <Link to="/">Humour</Link>
        </li>
        <li>
          <Link to="/">VegIQ Test</Link>
        </li>
        <li>
          <Link to="/">Vegetarianism</Link>
        </li>
        <li>
          <Link to="/">Raw Food</Link>
        </li>
        <li>
          <Link to="/">Environment</Link>
        </li>
        <li>
          <Link to="/">All Topics</Link>
        </li>
      </ul>
    </div>
  );
};

export default VegTopics;
