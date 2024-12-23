import FooterThree from "@/layout/footers/footer-3";
import HeaderThree from "@/layout/headers/header-3";
import React from "react";
import TestimonialArea from "../home-3/testimonial-area";
import BlogArea from "./blog-area";
import CardArea from "../../../common/card-area";
import CounterArea from "./counter-area";
import HeroArea from "./hero-area";
import IntegrationArea from "./integration-area";
import RatedArea from "./rated-area";
import SalesArea from "../../../common/sales-area";
import ServiceArea from "./service-area";
import FooterTwo from "@/layout/footers/footer-2";
import Footer from "@/layout/footers/footer";
import FooterFour from "@/layout/footers/footer-4";
import FooterFive from "@/layout/footers/footer-5";

const HomeThree = () => {
  return (
    <>
      <HeaderThree />
      <HeroArea />
      {/* <CounterArea /> */}
      {/* <TestimonialArea />
      <IntegrationArea /> */}
      {/* <BlogArea /> */}
      <FooterFour />
    </>
  );
};

export default HomeThree;
