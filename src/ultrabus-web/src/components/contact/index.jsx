import FooterFive from "@/layout/footers/footer-5";
import HeaderSix from "@/layout/headers/header-6";
import React from "react";
import Breadcrumb from "../../common/breadcrumbs/breadcrumb";
import ContactFormArea from "./contact-form-area";
import ContactInner from "./contact-inner";
import CtaArea from "./cta-area";
import HeroBanner from "../../common/hero-banner";
import OfficeLocation from "./office-location";

const Contact = () => {
  return (
    <>
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <Breadcrumb title_top="UltraBus" title_bottom="UltraBus" />
            <HeroBanner
              bg_img="/assets/img/contact/contact-banner.jpg"
              title="UltraBus"
              subtitle="Contact"
            />
            {/* <OfficeLocation /> */}
            <ContactFormArea />
            <ContactInner />
          </main>
        </div>
      </div>
    </>
  );
};

export default Contact;
