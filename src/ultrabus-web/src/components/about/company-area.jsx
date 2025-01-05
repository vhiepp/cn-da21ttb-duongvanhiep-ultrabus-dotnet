import VideoPopup from "@/modals/video-popup";
import React, { useState } from "react";

const company_content = {
  sub_title: "ABOUT THE COMPANY",
  title: (
    <>
      Softuch is Made <br />
      For the Creator.
    </>
  ),
  info_1: (
    <>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rutrum arcu
      sollicitudin viverra sit elit leo in. Vitae eu tellus mattis quis. Eu,
      tempus donec nam mauris egestas. Id aliquet ultricies ligula tellus arcu
      dolor. Massa arcu pulvinar in mattis
    </>
  ),
  info_2: (
    <>
      Feugiat purus congue risus, blandit a sed. In aenean quam aenean purus
      dictum pellentesque consequat.!
    </>
  ),
  info_3: (
    <>
      Our clean and simple APIs and transparent SaaS model will give you
      complete peace of mind.
    </>
  ),
};
const { sub_title, title, info_1, info_2, info_3 } = company_content;

const CompanyArea = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <>
      <div className="ab-company-area pt-150">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-4">
              <div className="ab-company-video">
                <a className="popup-video" onClick={() => setIsVideoOpen(true)}>
                  <i className="fas fa-play"></i>
                </a>
                <span>Xem giới thiệu</span>
              </div>
            </div>
            <div className="col-xl-8">
              <div className="row">
                <div className="col-md-4 col-sm-4 mb-40">
                  <div className="ab-company-fun-fact-wrap d-flex justify-content-start">
                    <div className="ab-company-fun-fact">
                      <span>PHỤC VỤ HƠN</span>
                      <h4 className="d-flex gap-2 align-items-center">
                        20M <em>+</em>
                      </h4>
                      <p>Khách hàng</p>
                    </div>
                  </div>
                </div>

                <div className="col-md-4 col-sm-4 mb-40">
                  <div className="ab-company-fun-fact-wrap d-flex justify-content-md-center justify-content-left">
                    <div className="ab-company-fun-fact">
                      <span>TRUNG BÌNH HƠN</span>
                      <h4 className="d-flex gap-2 align-items-center">
                        80K <em>+</em>
                      </h4>
                      <p>Khách hàng mỗi năm</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 col-sm-4 mb-40">
                  <div className="ab-company-fun-fact-wrap ab-company-border-none d-flex justify-content-md-center justify-content-left">
                    <div className="ab-company-fun-fact">
                      <span>HOẠT ĐỘNG Ở</span>
                      <h4 className="d-flex gap-2 align-items-center">
                        30 <em>+</em>
                      </h4>
                      <p>Tỉnh thành trên toàn quốc</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* video modal start */}
      <VideoPopup
        isVideoOpen={isVideoOpen}
        setIsVideoOpen={setIsVideoOpen}
        videoId={"bRv2Bh2R3kA"}
      />
      {/* video modal end */}
    </>
  );
};

export default CompanyArea;
