import React from "react";

import { NavBar } from "../../lib/components";

import { JobsList, SearchForm } from "./components";

export const Home = () => {
  return (
    <div>
      <NavBar />
      <SearchForm />
      <JobsList />
    </div>
  );
};
