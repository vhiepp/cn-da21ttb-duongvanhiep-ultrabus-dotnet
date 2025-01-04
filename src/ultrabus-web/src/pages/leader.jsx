import React from "react";
import SEO from "../common/seo";
import Wrapper from "../layout/wrapper";
import LeaderTeam from "@/components/team/leader";

const index = () => {
  return (
    <Wrapper>
      <SEO pageTitle={"Ban chủ nhiệm"} />
      <LeaderTeam />
    </Wrapper>
  );
};

export default index;
