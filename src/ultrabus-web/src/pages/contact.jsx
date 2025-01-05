import React from "react";
import SEO from "@/common/seo";
import Wrapper from "@/layout/wrapper";
import Developing from "@/components/dev/developing";
import Contact from "@/components/contact";

const index = () => {
  return (
    <Wrapper>
      <SEO pageTitle={"Liên hệ"} />
      <Contact />
    </Wrapper>
  );
};

export default index;
