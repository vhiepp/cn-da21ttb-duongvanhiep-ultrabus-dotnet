import Link from "next/link";
import React from "react";

const cta_content = {
  bg_img: "/assets/img/cta/cta-bg.jpg",
  title: "Đặt vé xe",
  description: (
    <>
      <span className="fs-3 fw-bold">UltraBus</span> <br /> Đồng hành cùng bạn
      trên mọi hành trình
    </>
  ),
  btn_text: "Đặt ngay",
};
const { bg_img, title, description, btn_text } = cta_content;

const CtaArea = () => {
  return (
    <>
      <div className="tp-cta-area p-relative">
        <div className="tp-cta-grey-bg grey-bg-2"></div>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div
                className="tp-cta-bg"
                style={{ backgroundColor: "var(--tp-theme-primary)" }}
              >
                <div className="tp-cta-content tp-inner-font text-center">
                  <h3 className="tp-section-title text-white">{title}</h3>
                  <p>{description}</p>
                  <Link
                    className="tp-btn-inner white-bg text-black"
                    href="/book-ticket"
                  >
                    {btn_text}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CtaArea;
