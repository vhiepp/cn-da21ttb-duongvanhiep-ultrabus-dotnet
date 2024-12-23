"use client";

import React from "react";
import SEO from "../common/seo";
import Wrapper from "../layout/wrapper";

import HomeThree from "@/components/homes/home-3";
const Home = () => {
  return (
    <Wrapper>
      <SEO pageTitle={"Softec - Data analytics"} />
      <HomeThree />
    </Wrapper>
  );
};

export default Home;
