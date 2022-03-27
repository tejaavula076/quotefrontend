import React from "react";

import logo from "../assets/quoteMaker.png";

const Hero = () => (
  <div className="text-center hero my-5">
    <img className="mb-3 app-logo" src={logo} alt="React logo" width="100%" />
    <h1 className="mb-4">Quote Maker</h1>

    <p className="lead">
      A Safe Place for all the quotes.
      <a href="/">Quote Maker</a>
    </p>
  </div>
);

export default Hero;
