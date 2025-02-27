import Link from "next/link";
import React from "react";
import Image from "next/image";
import MobileMenus from "../layout/headers/mobile-menus";

// images import
import logo from "@/app-assets/img/logo/ithub-logo2.png";
import canvus_img_1 from "@/app-assets/img/team/team-1.png";
import canvus_img_2 from "@/app-assets/img/team/team-2.png";
import canvus_img_3 from "@/app-assets/img/team/team-3.png";
import canvus_img_4 from "@/app-assets/img/team/team-4.png";

const Offcanvus = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <>
      <div className="tpoffcanvas-area">
        <div className={`tpoffcanvas ${sidebarOpen && "opened"}`}>
          <div className="tpoffcanvas__close-btn">
            <button className="close-btn" onClick={() => setSidebarOpen(false)}>
              <i className="fal fa-times"></i>
            </button>
          </div>
          <div className="tpoffcanvas__logo text-center">
            <Link href="/" onClick={() => setSidebarOpen(false)}>
              <Image src={logo} style={{ height: 50 }} alt="theme-pure" />
            </Link>
          </div>
          <div className="mobile-menu mean-container">
            <MobileMenus onClick={() => setSidebarOpen(false)} />
          </div>
          <div className="tpoffcanvas__instagram text-center">
            <div className="tpoffcanvas__instagram-title">
              <h4>IThub Teams</h4>
            </div>
            <Link href="#">
              <Image src={canvus_img_1} alt="theme-pure" />
            </Link>
            <Link href="#">
              <Image src={canvus_img_2} alt="theme-pure" />
            </Link>
            <Link href="#">
              <Image src={canvus_img_3} alt="theme-pure" />
            </Link>
            <Link href="#">
              <Image src={canvus_img_4} alt="theme-pure" />
            </Link>
          </div>
          <div className="tpoffcanvas__info text-center">
            <h4 className="offcanva-title">Liên hệ</h4>
            <Link
              href="https://maps.app.goo.gl/fSR5iXxTiBc2aQBs9"
              target="_blank"
            >
              126, Nguyễn Thiện Thành,
              <br /> khóm 4, phường 5, <br />
              TP. Trà Vinh, tỉnh Trà Vinh <br /> <br />
            </Link>
            <Link href="mailto:contact@ithub.club" target="_blank">
              contact@ithub.club
            </Link>
          </div>
          <div className="tpoffcanvas__social">
            <div className="social-icon text-center">
              {/* <Link href="#">
                <i className="fab fa-twitter"></i>
              </Link>
              <Link href="#">
                <i className="fab fa-instagram"></i>
              </Link> */}
              <Link href="https://www.facebook.com/ithub.tvu/" target="_blank">
                <i className="fab fa-facebook-square"></i>
              </Link>
              <Link href="https://github.com/TVU-ITHub" target="_blank">
                <i className="fab fa-github"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`body-overlay ${sidebarOpen && "apply"}`}
        onClick={() => setSidebarOpen(false)}
      ></div>
    </>
  );
};

export default Offcanvus;
