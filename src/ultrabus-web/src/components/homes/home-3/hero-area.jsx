import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicEffect";
import useTitleAnimation from "@/hooks/useTitleAnimation";
import Brwoser from "@/common/brwoser";
import BounceLine from "@/svg/bounce-line";
import gsap from "gsap";
import Image from "next/image";
import React, { useEffect, useRef } from "react";

import left_shape from "../../../../public/assets/img/hero/hero-left-shape-3-1.png";
import gradient_bg from "../../../../public/assets/img/hero/hero-gradient-3.jpg";
import img_1 from "../../../../public/assets/img/hero/hero-img-3-1.png";
import img_2 from "../../../../public/assets/img/hero/hero-img-3-1-3.png";
import Link from "next/link";

const hero_content = {
  title_1: (
    <>
      Great <span>Customer</span>
    </>
  ),
  title_2: "Relationships Start Here.",
  info: (
    <>
      Softec provides all customer management service within one software.{" "}
      <br /> Our landing works on all devices.
    </>
  ),
  btn_1: "Live Damo",
  btn_2: "Try it on Browser",
};
const { title_1, title_2, info, btn_1, btn_2 } = hero_content;

const HeroArea = () => {
  let info_anim = useRef(null);

  useIsomorphicLayoutEffect(() => {
    let tl = gsap.timeline({ default: { ease: "SlowMo.easeOut" } });
    tl.to(".hero-text-anim i.child-1", {
      y: "0px",
      duration: 1,
      opacity: 1,
      stagger: 0.3,
      delay: 0.5,
    });
  }, []);

  return (
    <>
      <div className="tp-hero-area tp-hero-pt pt-170 pb-70 p-relative">
        <div className="tp-hero-left-shape">
          <Image src={left_shape} alt="them-pure" />
        </div>
        <div className="tp-hero-gradient-bg">
          <Image src={gradient_bg} alt="them-pure" />
        </div>
        <div className="container">
          <div className="row justify-content-center z-index-3">
            <div className="col-xl-11">
              <div className="">
                <div className="border border-warning rounded-3 p-3 shadow bg-white">
                  <div className="row">
                    <div className="col row">
                      <div className="col col-12 col-lg-3">
                        <input
                          type="radio"
                          className="me-2"
                          name="radio-1"
                          id="radio-1-1"
                          checked
                        />
                        <label htmlFor="radio-1-1">Một chiều</label>
                      </div>
                      <div className="col col-12 col-lg-3">
                        <input
                          type="radio"
                          name="radio-1"
                          className="me-2"
                          id="radio-1-2"
                        />
                        <label htmlFor="radio-1-2">Khứ hồi</label>
                      </div>
                    </div>
                    <div className="col">
                      <p className="fs-6 text-end text-warning ">
                        Hướng dẫn mua vé
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <label htmlFor="">Điểm đi</label>
                      <select
                        class="form-select form-select-lg mb-3"
                        aria-label=".form-select-lg example"
                      >
                        <option selected>Chọn điểm đi</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                    </div>
                    <div className="col">
                      <label htmlFor="">Điểm đến</label>
                      <select
                        class="form-select form-select-lg mb-3"
                        aria-label=".form-select-lg example"
                      >
                        <option selected>Chọn điểm đến</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                    </div>
                    <div className="col">
                      <label htmlFor="">Ngày đi</label>
                      <div className=" input-group input-group-lg">
                        <input type="date" className="form-control" />
                      </div>
                    </div>
                    <div className="col">
                      <label htmlFor="">Số vé</label>
                      <select
                        class="form-select form-select-lg mb-3"
                        aria-label=".form-select-lg example"
                      >
                        <option value="1" selected>
                          1
                        </option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="position-relative d-flex justify-content-center">
                        <button className="position-absolute btn btn-danger px-5">
                          Tìm vé
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className="tp-hero-3-wrapper p-relative">
                <div className="tp-hero-3-border-wrap d-none d-md-block">
                  <span className="redius-shape-1"></span>
                  <span className="redius-shape-2"></span>
                  <span className="redius-shape-3"></span>
                </div>
                <div className="tp-hero-3-main-thumb z-index-5">
                  <Image src={img_1} alt="them-pure" />
                </div>
                <div className="tp-hero-3-shape-5 d-none d-lg-block wow frist-img animated">
                  <Image src={img_2} alt="them-pure" />
                </div>
                <div className="tp-hero-3-shape-6 d-none d-lg-block">
                  <span>
                    {" "}
                    <BounceLine />{" "}
                  </span>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroArea;
