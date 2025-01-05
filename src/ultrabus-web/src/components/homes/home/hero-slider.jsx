import React, { useEffect, useRef } from "react";
//use gsap
import { gsap } from "gsap";
import useCharAnimation from "@/hooks/useCharAnimation";
import Image from "next/image";

// images import
import hero_frame from "../../../../public/assets/img/hero/hero-frame.png";
import shape_1 from "../../../../public/assets/img/hero/hero-line-shape.png";
import shape_2 from "../../../../public/assets/img/hero/hero-line-shape-2.png";
import shape_img_1 from "../../../../public/assets/img/hero/bus.png";
import shape_img_2 from "../../../../public/assets/img/hero/hero-shape-2.png";
import LineShape from "@/svg/line-shape";
import Link from "next/link";
import NiceSelect from "@/ui/nice-select";

// hero content data
const hero_content = {
  hero_shape: [
    {
      id: 1,
      cls: "tp-hero-shape-1",
      img: shape_1,
    },
    {
      id: 2,
      cls: "tp-hero-shape-2",
      img: shape_2,
    },
  ],
  hero_title: (
    <>
      <span className="tp_title" style={{ marginBottom: 12, marginTop: 24 }}>
        <span className="child" style={{ color: "#fff", fontWeight: 900 }}>
          UltraBus
        </span>
      </span>{" "}
      <br />
      <span>
        <span className="child" style={{ color: "var(--tp-theme-yellow)" }}>
          {/* Software & Technology */}
        </span>
      </span>{" "}
    </>
  ),
  sub_title: <>We are not going to save your data</>,
  hero_shape_img: [
    {
      id: 1,
      cls: "1",
      img: shape_img_1,
    },
    {
      id: 2,
      cls: "2",
      img: shape_img_2,
    },
  ],

  hero_thumbs: [
    {
      id: 1,
      col: "4",
      cls: "tp-hero__sm-img",
      img: "https://storage.googleapis.com/futa-busline-web-cms-prod/599_x_337_px_x2_70c927a0c2/599_x_337_px_x2_70c927a0c2.jpg",
    },
    {
      id: 2,
      col: "8",
      cls: "",
      img: "https://storage.googleapis.com/futa-busline-web-cms-prod/589_x_273_px_24bb13dbb5/589_x_273_px_24bb13dbb5.png",
    },
  ],
};
const { hero_shape, hero_title, sub_title, hero_shape_img, hero_thumbs } =
  hero_content;

const HeroSlider = () => {
  let hero_bg = useRef(null);

  useEffect(() => {
    gsap.from(hero_bg.current, {
      opacity: 0,
      scale: 1.2,
      duration: 1.5,
    });
    gsap.to(hero_bg.current, {
      opacity: 1,
      scale: 1,
      duration: 1.5,
    });
  }, []);

  const selectHandler = (e) => {};

  useCharAnimation(".tp-hero__hero-title span.child");

  return (
    <>
      <div className="tp-hero__area tp-hero__pl-pr">
        <div className="tp-hero__bg p-relative">
          <div className="tp-hero-bg tp-hero-bg-single" ref={hero_bg}>
            <Image
              // style={{width: "auto", height: "auto"}}
              src={hero_frame}
              alt="theme-pure"
            />
          </div>
          <div className="tp-hero-shape">
            {hero_shape.map((item, i) => (
              <Image
                // style={{width: "auto", height: "auto"}}
                key={i}
                className={item.cls}
                src={item.img}
                alt="theme-pure"
              />
            ))}
          </div>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-12">
                <div className="tp-hero__content-box text-center z-index-6">
                  <div className="tp-hero__title-box p-relative">
                    <h2
                      className="tp-title-anim"
                      style={{ fontSize: 70, paddingBottom: 30 }}
                    >
                      {hero_title}
                    </h2>
                    <div class="card z-index-5 rounded-4 shadow-lg pt-4 px-3">
                      <div class="card-body">
                        <div className="row mb-3">
                          <div className="col-12 col-md-6 order-2 order-md-1">
                            <div
                              className="text-start"
                              style={{ color: "var(--tp-theme-primary)" }}
                            >
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  style={{}}
                                  name="inlineRadioOptions"
                                  id="inlineRadio1"
                                  value="option1"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="inlineRadio1"
                                >
                                  Một chiều
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  style={{}}
                                  type="radio"
                                  name="inlineRadioOptions"
                                  id="inlineRadio2"
                                  value="option2"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="inlineRadio2"
                                >
                                  Khứ hồi
                                </label>
                              </div>
                            </div>
                          </div>
                          <div
                            className="col-12 col-md-6 text-start text-md-end order-1 order-md-2 mb-2 mb-md-0"
                            style={{ color: "var(--tp-theme-primary)" }}
                          >
                            <Link href="/search">Hướng dẫn mua vé</Link>
                          </div>
                        </div>
                        <div className="row py-3">
                          <div className="col-12 col-md-6 col-lg-3">
                            <div className="postbox__select mb-30">
                              <NiceSelect
                                options={[
                                  { value: "1", text: "Hà Nội" },
                                  { value: "2", text: "TP. Hồ Chí Minh" },
                                  { value: "3", text: "Đà Nẵng" },
                                  { value: "4", text: "Hải Phòng" },
                                  { value: "5", text: "Cần Thơ" },
                                  { value: "6", text: "Đà Lạt" },
                                  { value: "7", text: "Nha Trang" },
                                  { value: "8", text: "Vũng Tàu" },
                                  { value: "9", text: "Quy Nhơn" },
                                  { value: "10", text: "Phan Thiết" },
                                  { value: "11", text: "Trà Vinh" },
                                ]}
                                placeholder="Chọn điểm đi"
                                title="Điểm đi"
                                onChange={selectHandler}
                              />
                            </div>
                          </div>
                          <div className="col-12 col-md-6 col-lg-3">
                            <div className="postbox__select mb-30">
                              <NiceSelect
                                options={[
                                  { value: "1", text: "Hà Nội" },
                                  { value: "2", text: "TP. Hồ Chí Minh" },
                                  { value: "3", text: "Đà Nẵng" },
                                  { value: "4", text: "Hải Phòng" },
                                  { value: "5", text: "Cần Thơ" },
                                  { value: "6", text: "Đà Lạt" },
                                  { value: "7", text: "Nha Trang" },
                                  { value: "8", text: "Vũng Tàu" },
                                  { value: "9", text: "Quy Nhơn" },
                                  { value: "10", text: "Phan Thiết" },
                                  { value: "11", text: "Trà Vinh" },
                                ]}
                                placeholder="Chọn điểm đến"
                                title="Điểm đến"
                                onChange={selectHandler}
                              />
                            </div>
                          </div>
                          <div className="col-12 col-md-6 col-lg-3">
                            <div className="postbox__select mb-30">
                              <NiceSelect
                                options={[
                                  { value: "1", text: "Hà Nội" },
                                  { value: "2", text: "TP. Hồ Chí Minh" },
                                  { value: "3", text: "Đà Nẵng" },
                                  { value: "4", text: "Hải Phòng" },
                                  { value: "5", text: "Cần Thơ" },
                                  { value: "6", text: "Đà Lạt" },
                                  { value: "7", text: "Nha Trang" },
                                  { value: "8", text: "Vũng Tàu" },
                                  { value: "9", text: "Quy Nhơn" },
                                  { value: "10", text: "Phan Thiết" },
                                  { value: "11", text: "Trà Vinh" },
                                ]}
                                placeholder="Điểm đến"
                                onChange={selectHandler}
                              />
                            </div>
                          </div>
                          <div className="col-12 col-md-6 col-lg-3">
                            <div className="postbox__select mb-30">
                              <NiceSelect
                                options={[
                                  { value: "1", text: "Hà Nội" },
                                  { value: "2", text: "TP. Hồ Chí Minh" },
                                  { value: "3", text: "Đà Nẵng" },
                                  { value: "4", text: "Hải Phòng" },
                                  { value: "5", text: "Cần Thơ" },
                                  { value: "6", text: "Đà Lạt" },
                                  { value: "7", text: "Nha Trang" },
                                  { value: "8", text: "Vũng Tàu" },
                                  { value: "9", text: "Quy Nhơn" },
                                  { value: "10", text: "Phan Thiết" },
                                  { value: "11", text: "Trà Vinh" },
                                ]}
                                placeholder="Điểm đến"
                                onChange={selectHandler}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="p-relative row justify-content-center">
                          <div
                            className=""
                            style={{
                              top: -10,
                              position: "absolute",
                            }}
                          >
                            <Link
                              className={`tp-btn-blue-sm inner-color alt-color-black tp-btn-hover d-none d-md-inline-block`}
                              style={{
                                backgroundColor: "rgb(239, 82, 34)",
                              }}
                              href="/register"
                            >
                              <span>Tìm chuyến xe</span>
                              <b></b>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="tp-hero__title-shape d-none d-sm-block"
                      style={{ bottom: "-62px" }}
                    >
                      <LineShape />
                    </div>
                  </div>
                  <div
                    className="tp-hero__input p-relative wow tpfadeUp"
                    data-wow-duration=".9s"
                    data-wow-delay=".5s"
                  >
                    {/* <HeroForm /> */}
                  </div>
                  <p
                    className="wow tpfadeUp"
                    data-wow-duration=".9s"
                    data-wow-delay=".7s"
                  >
                    {/* {sub_title} */}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="tp-hero__bottom z-index-5">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-10">
                <div className="tp-hero__thumb-wrapper-main p-relative">
                  {hero_shape_img.map((item, i) => (
                    <div
                      key={i}
                      className={`tp-hero__shape-img-${item.cls} d-none d-xl-block`}
                    >
                      <Image src={item.img} alt="theme-pure" />
                    </div>
                  ))}
                  <div>
                    <div className="tp-hero__thumb-wrapper d-none d-md-block p-relative">
                      <div className="row">
                        <div className="col-8">
                          <div className="tp-hero__thumb-box">
                            <div className="row">
                              <div className="col-md-12">
                                <div className="tp-hero__thumb mb-20">
                                  {/* <Image
                                    style={{ width: "auto", height: "auto" }}
                                    className="w-100"
                                    src={hero_thumb_1}
                                    alt="theme-pure"
                                  /> */}
                                  <img
                                    src="https://cdn.futabus.vn/futa-busline-web-cms-prod/Web_d7765492bf/Web_d7765492bf.png"
                                    alt=""
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="row">
                              {hero_thumbs.map((item, i) => (
                                <div key={i} className={`col-md-${item.col}`}>
                                  <div className={`tp-hero__thumb ${item.cls}`}>
                                    <img
                                      src={item.img}
                                      alt=""
                                      className="w-100"
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="tp-hero__thumb-box">
                            <div className="tp-hero__thumb">
                              {/* <Image
                                style={{ width: "auto", height: "auto" }}
                                className="w-100"
                                src={hero_thumb_2}
                                alt="theme-pure"
                              /> */}
                              <img
                                className="w-100 mb-4"
                                src="https://cdn.futabus.vn/futa-busline-web-cms-prod/KHAI_TRUONG_TUYEN_BX_DONG_XOAI_BX_MIEN_DONG_CU_02_33ffde202e/KHAI_TRUONG_TUYEN_BX_DONG_XOAI_BX_MIEN_DONG_CU_02_33ffde202e.png"
                                alt=""
                              />
                              <img
                                className="w-100 mb-4"
                                src="https://cdn.futabus.vn/futa-busline-web-cms-prod/Artboard_3_8_d96b03f2c3/Artboard_3_8_d96b03f2c3.png"
                                alt=""
                              />
                              <img
                                className="w-100 mb-4"
                                src="https://cdn.futabus.vn/futa-busline-web-cms-prod/599x337_px_257db3bfed/599x337_px_257db3bfed.png"
                                alt=""
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSlider;
