import React from "react";
import SEO from "@/common/seo";
import Wrapper from "@/layout/wrapper";
import Developing from "@/components/dev/developing";
import { useRouter } from "next/router";
import BookTicketForm from "@/components/ticket/book-ticket-form";

const index = () => {
  //   const router = useRouter();
  //   const query = router.query;

  //   console.log(query);

  return (
    <Wrapper>
      <SEO pageTitle={"Đặt vé xe"} />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main className="fix" style={{ minHeight: "80vh" }}>
            <div className="container" style={{ marginTop: "100px" }}>
              <BookTicketForm />
            </div>
          </main>
        </div>
      </div>
      {/* <div className="container" style={{ marginTop: "100px" }}>
        <div className="row">
          <div className="col-12">
            <BookTicketForm />
          </div>
        </div>
      </div> */}
    </Wrapper>
  );
};

export default index;
