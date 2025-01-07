import BreadcrumbTwo from "@/common/breadcrumbs/breadcrumb-2";
import FooterFive from "@/layout/footers/footer-5";
import HeaderSix from "@/layout/headers/header-6";
import React from "react";
import CtaArea from "../contact/cta-area";
import BlogGrid from "./blog-grid";
import Portfolio from "./portfolio";

const Blog = () => {
  return (
    <>
      <main>
        <BreadcrumbTwo title={"Tin tức mới nhất"} innertitle={"Tin tức"} />
        <BlogGrid />
        <Portfolio />
        <CtaArea />
      </main>
    </>
  );
};

export default Blog;
