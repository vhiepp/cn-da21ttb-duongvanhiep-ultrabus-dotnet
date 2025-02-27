import LogingForm from "@/forms/loging-form";
import AppleIcon from "@/svg/apple-icon";
import GoogleIcon from "@/svg/google-icon";
import Link from "next/link";
import Image from "next/image";
import React from "react";

// shap import here
import shape_1 from "../../../public/assets/img/login/login-shape-1.png";
import shape_2 from "@/app-assets/img/about/chuyennghiep.png";
import shape_3 from "@/app-assets/img/about/sangtao.png";
import shape_4 from "@/app-assets/img/about/nhom.png";
import shape_5 from "../../../public/assets/img/hero/bus.png";
import MicrosoftIcon from "@/svg/microsoft-icon";

const login_content = {
  bg_img: "/assets/img/login/login-bg-shape.png",
  banner_title: (
    <>
      Welcome To <br />{" "}
      <span
        className="fw-bold"
        style={{
          fontSize: "3rem",
        }}
      >
        UltraBus
      </span>
    </>
  ),
};
const { bg_img, banner_title } = login_content;

const SingnInArea = () => {
  return (
    <>
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <div className="signin-banner-area signin-banner-main-wrap d-flex align-items-center">
              <div
                className="signin-banner-left-box signin-banner-bg p-relative"
                style={{ backgroundColor: "var(--tp-theme-primary)" }}
              >
                <div className="signin-banner-bottom-shape">
                  <Image src={shape_1} alt="theme-pure" />
                </div>
                <div className="signin-banner-left-wrap">
                  <div className="signin-banner-title-box mb-100">
                    <h4 className="signin-banner-title tp-char-animation">
                      {banner_title}
                    </h4>
                  </div>
                  <div className="signin-banner-img-box position-relative">
                    <div className="signin-banner-img signin-img-1 d-none d-md-block z-index-3">
                      <Image src={shape_2} alt="theme-pure" />
                    </div>
                    <div className="signin-banner-img signin-img-2 d-none d-md-block">
                      <Image src={shape_3} alt="theme-pure" />
                    </div>
                    <div className="signin-banner-img signin-img-3 d-none d-md-block z-index-5">
                      <Image src={shape_4} alt="theme-pure" />
                    </div>
                    <div
                      className="signin-banner-img signin-img-4 d-none d-sm-block"
                      style={{
                        bottom: -95,
                        left: -70,
                      }}
                    >
                      <Image
                        src={shape_5}
                        style={{ width: 180 }}
                        alt="theme-pure"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="signin-banner-from d-flex justify-content-center align-items-center">
                <div className="signin-banner-from-wrap">
                  <div className="signin-banner-title-box">
                    <h4 className="signin-banner-from-title">Đăng Nhập</h4>
                  </div>
                  <div className="signin-banner-login-browser">
                    <Link href="#">
                      <GoogleIcon />
                      <span className="ms-2">Đăng nhập với Google</span>
                    </Link>
                    {/* <Link href="#">
                      <GoogleIcon />
                    </Link> */}
                  </div>
                  <div className="signin-banner-from-box">
                    <h5 className="signin-banner-from-subtitle">Hoặc</h5>
                    <LogingForm />
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default SingnInArea;
