import React from "react";

import { useAuth0 } from "@auth0/auth0-react";

import QuoteList from "../components/QuoteList";
import Hero from "../components/Hero";

const Home = () => {
  const { isAuthenticated } = useAuth0();

  // eslint-disable-next-line react/jsx-no-undef
  return isAuthenticated ? <QuoteList /> : <Hero />;
};

export default Home;
