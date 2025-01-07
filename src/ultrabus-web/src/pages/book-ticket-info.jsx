import SEO from "@/common/seo";
import Wrapper from "@/layout/wrapper";
import BusStationSelect from "@/ui/bus-station-select";
import DateSelect from "@/ui/date-select";
import Link from "next/link";
import { useRouter } from "next/router";

// import seatIcon from "@/public/app-assets/img/icons/icons8-seat-50.png";
// import shape_2 from "../../../../public/assets/img/cta/cta-shape-5-2.png";

const index = () => {
  const router = useRouter();
  return (
    <Wrapper>
      <SEO pageTitle={"Đặt vé xe"} />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main className="fix" style={{ minHeight: "80vh" }}>
            <div className="container" style={{ marginTop: "100px" }}>
              <div className="row pb-4">
                <div className="col-12">
                  <h3 className="text-center">Trà Vinh - TP. Hồ Chí Minh</h3>
                </div>
                <div className="col-12 col-lg-8">
                  <div className="card z-index-4 rounded-4 shadow-lg mb-3 px-2 py-2">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-12 mb-3">
                          <span className="fs-5 fw-bold">Chọn ghế</span>
                        </div>
                        <div className="col-12 d-flex">
                          <div className="text-center me-2">
                            <span className="">Tầng dưới</span>
                            <table
                              className="table table-borderless"
                              style={{ width: "220px" }}
                            >
                              <tbody>
                                <tr>
                                  <td className="text-center px-3">
                                    <div className="p-relative d-flex justify-content-center align-items-center bg-light rounded-2 px-1 py-2">
                                      <img
                                        src={
                                          "/app-assets/img/icons/icons8-seat-50.png"
                                        }
                                        alt="seat"
                                        style={{ width: "20px", opacity: 0.1 }}
                                      />
                                      <span
                                        className="d-block fs-6 text-center fw-bold text-info"
                                        style={{
                                          position: "absolute",
                                        }}
                                      >
                                        A01
                                      </span>
                                    </div>
                                  </td>
                                  <td className="text-center px-3">
                                    {/* <div className="p-relative d-flex justify-content-center align-items-center bg-light rounded-2 px-1 py-2">
                                      <img
                                        src={
                                          "/app-assets/img/icons/icons8-seat-50.png"
                                        }
                                        alt="seat"
                                        style={{ width: "20px", opacity: 0.1 }}
                                      />
                                      <span
                                        className="d-block fs-6 text-center fw-bold text-info"
                                        style={{
                                          position: "absolute",
                                        }}
                                      >
                                        A01
                                      </span>
                                    </div> */}
                                  </td>
                                  <td className="text-center px-3">
                                    <div className="p-relative d-flex justify-content-center align-items-center bg-body-secondary text-secondary rounded-2 px-1 py-2">
                                      <img
                                        src={
                                          "/app-assets/img/icons/icons8-seat-50.png"
                                        }
                                        alt="seat"
                                        style={{ width: "20px", opacity: 0.1 }}
                                      />
                                      <span
                                        className="d-block fs-6 text-center fw-bold"
                                        style={{
                                          position: "absolute",
                                        }}
                                      >
                                        A01
                                      </span>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="text-center px-3">
                                    <div
                                      className="p-relative d-flex justify-content-center align-items-center rounded-2 px-1 py-2"
                                      style={{
                                        color: "var(--tp-theme-primary)",
                                        backgroundColor:
                                          "rgba(211, 117, 40, 0.1)",
                                      }}
                                    >
                                      <img
                                        src={
                                          "/app-assets/img/icons/icons8-seat-50.png"
                                        }
                                        alt="seat"
                                        style={{ width: "20px", opacity: 0.1 }}
                                      />
                                      <span
                                        className="d-block fs-6 text-center fw-bold"
                                        style={{
                                          position: "absolute",
                                        }}
                                      >
                                        A01
                                      </span>
                                    </div>
                                  </td>
                                  <td className="text-center px-3">
                                    <div className="p-relative d-flex justify-content-center align-items-center bg-light rounded-2 px-1 py-2">
                                      <img
                                        src={
                                          "/app-assets/img/icons/icons8-seat-50.png"
                                        }
                                        alt="seat"
                                        style={{ width: "20px", opacity: 0.1 }}
                                      />
                                      <span
                                        className="d-block fs-6 text-center fw-bold text-info"
                                        style={{
                                          position: "absolute",
                                        }}
                                      >
                                        A01
                                      </span>
                                    </div>
                                  </td>
                                  <td className="text-center px-3">
                                    <div className="p-relative d-flex justify-content-center align-items-center bg-light rounded-2 px-1 py-2">
                                      <img
                                        src={
                                          "/app-assets/img/icons/icons8-seat-50.png"
                                        }
                                        alt="seat"
                                        style={{ width: "20px", opacity: 0.1 }}
                                      />
                                      <span
                                        className="d-block fs-6 text-center fw-bold text-info"
                                        style={{
                                          position: "absolute",
                                        }}
                                      >
                                        A01
                                      </span>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="text-center px-3">
                                    <div className="p-relative d-flex justify-content-center align-items-center bg-light rounded-2 px-1 py-2">
                                      <img
                                        src={
                                          "/app-assets/img/icons/icons8-seat-50.png"
                                        }
                                        alt="seat"
                                        style={{ width: "20px", opacity: 0.1 }}
                                      />
                                      <span
                                        className="d-block fs-6 text-center fw-bold text-info"
                                        style={{
                                          position: "absolute",
                                        }}
                                      >
                                        A01
                                      </span>
                                    </div>
                                  </td>
                                  <td className="text-center px-3">
                                    <div className="p-relative d-flex justify-content-center align-items-center bg-light rounded-2 px-1 py-2">
                                      <img
                                        src={
                                          "/app-assets/img/icons/icons8-seat-50.png"
                                        }
                                        alt="seat"
                                        style={{ width: "20px", opacity: 0.1 }}
                                      />
                                      <span
                                        className="d-block fs-6 text-center fw-bold text-info"
                                        style={{
                                          position: "absolute",
                                        }}
                                      >
                                        A01
                                      </span>
                                    </div>
                                  </td>
                                  <td className="text-center px-3">
                                    <div className="p-relative d-flex justify-content-center align-items-center bg-light rounded-2 px-1 py-2">
                                      <img
                                        src={
                                          "/app-assets/img/icons/icons8-seat-50.png"
                                        }
                                        alt="seat"
                                        style={{ width: "20px", opacity: 0.1 }}
                                      />
                                      <span
                                        className="d-block fs-6 text-center fw-bold text-info"
                                        style={{
                                          position: "absolute",
                                        }}
                                      >
                                        A01
                                      </span>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="text-center px-3">
                                    <div className="p-relative d-flex justify-content-center align-items-center bg-light rounded-2 px-1 py-2">
                                      <img
                                        src={
                                          "/app-assets/img/icons/icons8-seat-50.png"
                                        }
                                        alt="seat"
                                        style={{ width: "20px", opacity: 0.1 }}
                                      />
                                      <span
                                        className="d-block fs-6 text-center fw-bold text-info"
                                        style={{
                                          position: "absolute",
                                        }}
                                      >
                                        A01
                                      </span>
                                    </div>
                                  </td>
                                  <td className="text-center px-3">
                                    <div className="p-relative d-flex justify-content-center align-items-center bg-light rounded-2 px-1 py-2">
                                      <img
                                        src={
                                          "/app-assets/img/icons/icons8-seat-50.png"
                                        }
                                        alt="seat"
                                        style={{ width: "20px", opacity: 0.1 }}
                                      />
                                      <span
                                        className="d-block fs-6 text-center fw-bold text-info"
                                        style={{
                                          position: "absolute",
                                        }}
                                      >
                                        A01
                                      </span>
                                    </div>
                                  </td>
                                  <td className="text-center px-3">
                                    <div className="p-relative d-flex justify-content-center align-items-center bg-light rounded-2 px-1 py-2">
                                      <img
                                        src={
                                          "/app-assets/img/icons/icons8-seat-50.png"
                                        }
                                        alt="seat"
                                        style={{ width: "20px", opacity: 0.1 }}
                                      />
                                      <span
                                        className="d-block fs-6 text-center fw-bold text-info"
                                        style={{
                                          position: "absolute",
                                        }}
                                      >
                                        A01
                                      </span>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="text-center px-3">
                                    <div className="p-relative d-flex justify-content-center align-items-center bg-light rounded-2 px-1 py-2">
                                      <img
                                        src={
                                          "/app-assets/img/icons/icons8-seat-50.png"
                                        }
                                        alt="seat"
                                        style={{ width: "20px", opacity: 0.1 }}
                                      />
                                      <span
                                        className="d-block fs-6 text-center fw-bold text-info"
                                        style={{
                                          position: "absolute",
                                        }}
                                      >
                                        A01
                                      </span>
                                    </div>
                                  </td>
                                  <td className="text-center px-3">
                                    <div className="p-relative d-flex justify-content-center align-items-center bg-light rounded-2 px-1 py-2">
                                      <img
                                        src={
                                          "/app-assets/img/icons/icons8-seat-50.png"
                                        }
                                        alt="seat"
                                        style={{ width: "20px", opacity: 0.1 }}
                                      />
                                      <span
                                        className="d-block fs-6 text-center fw-bold text-info"
                                        style={{
                                          position: "absolute",
                                        }}
                                      >
                                        A01
                                      </span>
                                    </div>
                                  </td>
                                  <td className="text-center px-3">
                                    <div className="p-relative d-flex justify-content-center align-items-center bg-light rounded-2 px-1 py-2">
                                      <img
                                        src={
                                          "/app-assets/img/icons/icons8-seat-50.png"
                                        }
                                        alt="seat"
                                        style={{ width: "20px", opacity: 0.1 }}
                                      />
                                      <span
                                        className="d-block fs-6 text-center fw-bold text-info"
                                        style={{
                                          position: "absolute",
                                        }}
                                      >
                                        A01
                                      </span>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="text-center px-3">
                                    <div className="p-relative d-flex justify-content-center align-items-center bg-light rounded-2 px-1 py-2">
                                      <img
                                        src={
                                          "/app-assets/img/icons/icons8-seat-50.png"
                                        }
                                        alt="seat"
                                        style={{ width: "20px", opacity: 0.1 }}
                                      />
                                      <span
                                        className="d-block fs-6 text-center fw-bold text-info"
                                        style={{
                                          position: "absolute",
                                        }}
                                      >
                                        A01
                                      </span>
                                    </div>
                                  </td>
                                  <td className="text-center px-3">
                                    <div className="p-relative d-flex justify-content-center align-items-center bg-light rounded-2 px-1 py-2">
                                      <img
                                        src={
                                          "/app-assets/img/icons/icons8-seat-50.png"
                                        }
                                        alt="seat"
                                        style={{ width: "20px", opacity: 0.1 }}
                                      />
                                      <span
                                        className="d-block fs-6 text-center fw-bold text-info"
                                        style={{
                                          position: "absolute",
                                        }}
                                      >
                                        A01
                                      </span>
                                    </div>
                                  </td>
                                  <td className="text-center px-3">
                                    <div className="p-relative d-flex justify-content-center align-items-center bg-light rounded-2 px-1 py-2">
                                      <img
                                        src={
                                          "/app-assets/img/icons/icons8-seat-50.png"
                                        }
                                        alt="seat"
                                        style={{ width: "20px", opacity: 0.1 }}
                                      />
                                      <span
                                        className="d-block fs-6 text-center fw-bold text-info"
                                        style={{
                                          position: "absolute",
                                        }}
                                      >
                                        A01
                                      </span>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div className="text-center me-2">
                            <span className="">Tầng trên</span>
                            <table
                              className="table table-borderless"
                              style={{ width: "220px" }}
                            >
                              <tbody>
                                <tr>
                                  <td className="text-center px-3">
                                    <div className="p-relative d-flex justify-content-center align-items-center bg-light rounded-2 px-1 py-2">
                                      <img
                                        src={
                                          "/app-assets/img/icons/icons8-seat-50.png"
                                        }
                                        alt="seat"
                                        style={{ width: "20px", opacity: 0.1 }}
                                      />
                                      <span
                                        className="d-block fs-6 text-center fw-bold text-info"
                                        style={{
                                          position: "absolute",
                                        }}
                                      >
                                        A01
                                      </span>
                                    </div>
                                  </td>
                                  <td className="text-center px-3">
                                    {/* <div className="p-relative d-flex justify-content-center align-items-center bg-light rounded-2 px-1 py-2">
                                      <img
                                        src={
                                          "/app-assets/img/icons/icons8-seat-50.png"
                                        }
                                        alt="seat"
                                        style={{ width: "20px", opacity: 0.1 }}
                                      />
                                      <span
                                        className="d-block fs-6 text-center fw-bold text-info"
                                        style={{
                                          position: "absolute",
                                        }}
                                      >
                                        A01
                                      </span>
                                    </div> */}
                                  </td>
                                  <td className="text-center px-3">
                                    <div className="p-relative d-flex justify-content-center align-items-center bg-body-secondary text-secondary rounded-2 px-1 py-2">
                                      <img
                                        src={
                                          "/app-assets/img/icons/icons8-seat-50.png"
                                        }
                                        alt="seat"
                                        style={{ width: "20px", opacity: 0.1 }}
                                      />
                                      <span
                                        className="d-block fs-6 text-center fw-bold"
                                        style={{
                                          position: "absolute",
                                        }}
                                      >
                                        A01
                                      </span>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="text-center px-3">
                                    <div
                                      className="p-relative d-flex justify-content-center align-items-center rounded-2 px-1 py-2"
                                      style={{
                                        color: "var(--tp-theme-primary)",
                                        backgroundColor:
                                          "rgba(211, 117, 40, 0.1)",
                                      }}
                                    >
                                      <img
                                        src={
                                          "/app-assets/img/icons/icons8-seat-50.png"
                                        }
                                        alt="seat"
                                        style={{ width: "20px", opacity: 0.1 }}
                                      />
                                      <span
                                        className="d-block fs-6 text-center fw-bold"
                                        style={{
                                          position: "absolute",
                                        }}
                                      >
                                        A01
                                      </span>
                                    </div>
                                  </td>
                                  <td className="text-center px-3">
                                    <div className="p-relative d-flex justify-content-center align-items-center bg-light rounded-2 px-1 py-2">
                                      <img
                                        src={
                                          "/app-assets/img/icons/icons8-seat-50.png"
                                        }
                                        alt="seat"
                                        style={{ width: "20px", opacity: 0.1 }}
                                      />
                                      <span
                                        className="d-block fs-6 text-center fw-bold text-info"
                                        style={{
                                          position: "absolute",
                                        }}
                                      >
                                        A01
                                      </span>
                                    </div>
                                  </td>
                                  <td className="text-center px-3">
                                    <div className="p-relative d-flex justify-content-center align-items-center bg-light rounded-2 px-1 py-2">
                                      <img
                                        src={
                                          "/app-assets/img/icons/icons8-seat-50.png"
                                        }
                                        alt="seat"
                                        style={{ width: "20px", opacity: 0.1 }}
                                      />
                                      <span
                                        className="d-block fs-6 text-center fw-bold text-info"
                                        style={{
                                          position: "absolute",
                                        }}
                                      >
                                        A01
                                      </span>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="text-center px-3">
                                    <div className="p-relative d-flex justify-content-center align-items-center bg-light rounded-2 px-1 py-2">
                                      <img
                                        src={
                                          "/app-assets/img/icons/icons8-seat-50.png"
                                        }
                                        alt="seat"
                                        style={{ width: "20px", opacity: 0.1 }}
                                      />
                                      <span
                                        className="d-block fs-6 text-center fw-bold text-info"
                                        style={{
                                          position: "absolute",
                                        }}
                                      >
                                        A01
                                      </span>
                                    </div>
                                  </td>
                                  <td className="text-center px-3">
                                    <div className="p-relative d-flex justify-content-center align-items-center bg-light rounded-2 px-1 py-2">
                                      <img
                                        src={
                                          "/app-assets/img/icons/icons8-seat-50.png"
                                        }
                                        alt="seat"
                                        style={{ width: "20px", opacity: 0.1 }}
                                      />
                                      <span
                                        className="d-block fs-6 text-center fw-bold text-info"
                                        style={{
                                          position: "absolute",
                                        }}
                                      >
                                        A01
                                      </span>
                                    </div>
                                  </td>
                                  <td className="text-center px-3">
                                    <div className="p-relative d-flex justify-content-center align-items-center bg-light rounded-2 px-1 py-2">
                                      <img
                                        src={
                                          "/app-assets/img/icons/icons8-seat-50.png"
                                        }
                                        alt="seat"
                                        style={{ width: "20px", opacity: 0.1 }}
                                      />
                                      <span
                                        className="d-block fs-6 text-center fw-bold text-info"
                                        style={{
                                          position: "absolute",
                                        }}
                                      >
                                        A01
                                      </span>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="text-center px-3">
                                    <div className="p-relative d-flex justify-content-center align-items-center bg-light rounded-2 px-1 py-2">
                                      <img
                                        src={
                                          "/app-assets/img/icons/icons8-seat-50.png"
                                        }
                                        alt="seat"
                                        style={{ width: "20px", opacity: 0.1 }}
                                      />
                                      <span
                                        className="d-block fs-6 text-center fw-bold text-info"
                                        style={{
                                          position: "absolute",
                                        }}
                                      >
                                        A01
                                      </span>
                                    </div>
                                  </td>
                                  <td className="text-center px-3">
                                    <div className="p-relative d-flex justify-content-center align-items-center bg-light rounded-2 px-1 py-2">
                                      <img
                                        src={
                                          "/app-assets/img/icons/icons8-seat-50.png"
                                        }
                                        alt="seat"
                                        style={{ width: "20px", opacity: 0.1 }}
                                      />
                                      <span
                                        className="d-block fs-6 text-center fw-bold text-info"
                                        style={{
                                          position: "absolute",
                                        }}
                                      >
                                        A01
                                      </span>
                                    </div>
                                  </td>
                                  <td className="text-center px-3">
                                    <div className="p-relative d-flex justify-content-center align-items-center bg-light rounded-2 px-1 py-2">
                                      <img
                                        src={
                                          "/app-assets/img/icons/icons8-seat-50.png"
                                        }
                                        alt="seat"
                                        style={{ width: "20px", opacity: 0.1 }}
                                      />
                                      <span
                                        className="d-block fs-6 text-center fw-bold text-info"
                                        style={{
                                          position: "absolute",
                                        }}
                                      >
                                        A01
                                      </span>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="text-center px-3">
                                    <div className="p-relative d-flex justify-content-center align-items-center bg-light rounded-2 px-1 py-2">
                                      <img
                                        src={
                                          "/app-assets/img/icons/icons8-seat-50.png"
                                        }
                                        alt="seat"
                                        style={{ width: "20px", opacity: 0.1 }}
                                      />
                                      <span
                                        className="d-block fs-6 text-center fw-bold text-info"
                                        style={{
                                          position: "absolute",
                                        }}
                                      >
                                        A01
                                      </span>
                                    </div>
                                  </td>
                                  <td className="text-center px-3">
                                    <div className="p-relative d-flex justify-content-center align-items-center bg-light rounded-2 px-1 py-2">
                                      <img
                                        src={
                                          "/app-assets/img/icons/icons8-seat-50.png"
                                        }
                                        alt="seat"
                                        style={{ width: "20px", opacity: 0.1 }}
                                      />
                                      <span
                                        className="d-block fs-6 text-center fw-bold text-info"
                                        style={{
                                          position: "absolute",
                                        }}
                                      >
                                        A01
                                      </span>
                                    </div>
                                  </td>
                                  <td className="text-center px-3">
                                    <div className="p-relative d-flex justify-content-center align-items-center bg-light rounded-2 px-1 py-2">
                                      <img
                                        src={
                                          "/app-assets/img/icons/icons8-seat-50.png"
                                        }
                                        alt="seat"
                                        style={{ width: "20px", opacity: 0.1 }}
                                      />
                                      <span
                                        className="d-block fs-6 text-center fw-bold text-info"
                                        style={{
                                          position: "absolute",
                                        }}
                                      >
                                        A01
                                      </span>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="text-center px-3">
                                    <div className="p-relative d-flex justify-content-center align-items-center bg-light rounded-2 px-1 py-2">
                                      <img
                                        src={
                                          "/app-assets/img/icons/icons8-seat-50.png"
                                        }
                                        alt="seat"
                                        style={{ width: "20px", opacity: 0.1 }}
                                      />
                                      <span
                                        className="d-block fs-6 text-center fw-bold text-info"
                                        style={{
                                          position: "absolute",
                                        }}
                                      >
                                        A01
                                      </span>
                                    </div>
                                  </td>
                                  <td className="text-center px-3">
                                    <div className="p-relative d-flex justify-content-center align-items-center bg-light rounded-2 px-1 py-2">
                                      <img
                                        src={
                                          "/app-assets/img/icons/icons8-seat-50.png"
                                        }
                                        alt="seat"
                                        style={{ width: "20px", opacity: 0.1 }}
                                      />
                                      <span
                                        className="d-block fs-6 text-center fw-bold text-info"
                                        style={{
                                          position: "absolute",
                                        }}
                                      >
                                        A01
                                      </span>
                                    </div>
                                  </td>
                                  <td className="text-center px-3">
                                    <div className="p-relative d-flex justify-content-center align-items-center bg-light rounded-2 px-1 py-2">
                                      <img
                                        src={
                                          "/app-assets/img/icons/icons8-seat-50.png"
                                        }
                                        alt="seat"
                                        style={{ width: "20px", opacity: 0.1 }}
                                      />
                                      <span
                                        className="d-block fs-6 text-center fw-bold text-info"
                                        style={{
                                          position: "absolute",
                                        }}
                                      >
                                        A01
                                      </span>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <hr />
                        <div className="col-12 mb-3">
                          <div className="row">
                            <div className="col-6">
                              <span className="fs-5 fw-bold d-block pb-3">
                                Thông tin khách hàng
                              </span>
                              <div className="row gx-20 mt-3">
                                <div className="col-12">
                                  <div className="postbox__comment-input mb-30">
                                    <input
                                      type="text"
                                      className="inputText"
                                      required
                                    />
                                    <span className="floating-label">
                                      Họ và tên{" "}
                                      <span className="text-danger">*</span>
                                    </span>
                                  </div>
                                </div>
                                <div className="col-12">
                                  <div className="postbox__comment-input mb-30">
                                    <input
                                      type="text"
                                      className="inputText"
                                      required
                                    />
                                    <span className="floating-label">
                                      Số điện thoại{" "}
                                      <span className="text-danger">*</span>
                                    </span>
                                  </div>
                                </div>
                                <div className="col-12">
                                  <div className="postbox__comment-input mb-30">
                                    <input
                                      type="text"
                                      className="inputText"
                                      required
                                    />
                                    <span className="floating-label">
                                      Email{" "}
                                      <span className="text-danger">*</span>
                                    </span>
                                  </div>
                                </div>
                                <div className="col-12">
                                  <div class="form-check">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      value=""
                                      id="flexCheckDefault"
                                    />
                                    <label
                                      class="form-check-label"
                                      for="flexCheckDefault"
                                    >
                                      <span className="text-danger">
                                        Chấp nhận điều khoản
                                      </span>{" "}
                                      đặt vé & chính sách bảo mật thông tin của
                                      chúng tôi
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-6 text-center">
                              <span
                                className="fs-6 text-center w-full mb-3 d-block"
                                style={{ color: "var(--tp-theme-primary)" }}
                              >
                                ĐIỀU KHOẢN VÀ LƯU Ý
                              </span>
                              <p className="" style={{ textAlign: "justify" }}>
                                (*) Quý khách vui lòng có mặt tại bến xuất phát
                                của xe trước ít nhất 30 phút giờ xe khởi hành,
                                mang theo thông báo đã thanh toán vé thành công
                                có chứa mã vé được gửi từ hệ thống. Vui lòng
                                liên hệ Trung tâm tổng đài{" "}
                                <span className="text-danger">1900 2307</span>{" "}
                                để được hỗ trợ.
                              </p>
                              <p className="" style={{ textAlign: "justify" }}>
                                (*) Nếu quý khách có nhu cầu trung chuyển, vui
                                lòng liên hệ Tổng đài trung chuyển{" "}
                                <span className="text-danger">1900 2307 </span>
                                trước khi đặt vé. Chúng tôi không đón/trung
                                chuyển tại những điểm xe trung chuyển không thể
                                tới được.
                              </p>
                            </div>
                          </div>
                        </div>
                        <hr />
                        <div className="col-12 mb-3">
                          <span className="fs-5 fw-bold d-block pb-3">
                            Thông tin đón trả
                          </span>
                          <div className="row">
                            <div className="col-6 row">
                              <span className="fs-6 d-block pb-3">
                                ĐIỂM ĐÓN
                              </span>
                              <div className="col-12 postbox__select mb-3">
                                <BusStationSelect
                                  options={[
                                    {
                                      value: 1,
                                      name: "VP. Nguyễn Đáng",
                                      address: "TP. Trà Vinh, TV",
                                      latitude: 20.844911,
                                      longitude: 106.68808,
                                    },
                                    {
                                      value: 2,
                                      name: "Bến Tre",
                                      address: "TP. Bến Tre, Bến Tre",
                                      latitude: 20.844911,
                                      longitude: 106.68808,
                                    },
                                    {
                                      value: 3,
                                      name: "Bến xe Miền Tây",
                                      address: "TP. Hồ Chí Minh",
                                      latitude: 20.844911,
                                      longitude: 106.68808,
                                    },
                                  ]}
                                  title={"Chọn điểm đón"}
                                  placeholder={"Chọn điểm đón"}
                                  onChange={(e) => e}
                                />
                              </div>
                              <p
                                className=""
                                style={{
                                  textAlign: "justify",
                                  fontSize: "14px",
                                }}
                              >
                                Quý khách vui lòng chuẩn bị trước{" "}
                                <span className="text-danger">45 phút</span> giờ
                                khởi hành để được xe trung chuyển đến đón hoặc
                                có mặt tại Bến xe/Văn Phòng trước{" "}
                                <span className="text-danger">15 phút</span> để
                                kiểm tra thông tin trước khi lên xe.
                              </p>
                            </div>
                            <div className="col-6">
                              <span className="col-12 fs-6 d-block pb-3">
                                ĐIỂM TRẢ
                              </span>
                              <div className="col-12 flex-grow-1 postbox__select mb-3">
                                <BusStationSelect
                                  options={[
                                    {
                                      value: 1,
                                      name: "VP. Nguyễn Đáng",
                                      address: "TP. Trà Vinh, TV",
                                      latitude: 20.844911,
                                      longitude: 106.68808,
                                    },
                                    {
                                      value: 2,
                                      name: "Bến Tre",
                                      address: "TP. Bến Tre, Bến Tre",
                                      latitude: 20.844911,
                                      longitude: 106.68808,
                                    },
                                    {
                                      value: 3,
                                      name: "Bến xe Miền Tây",
                                      address: "TP. Hồ Chí Minh",
                                      latitude: 20.844911,
                                      longitude: 106.68808,
                                    },
                                  ]}
                                  title={"Chọn điểm trả"}
                                  placeholder={"Chọn điểm trả"}
                                  onChange={(e) => e}
                                />
                              </div>
                              <p></p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-4">
                  <div className="card z-index-4 rounded-4 shadow-lg mb-3 px-2 py-2">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-12 mb-3">
                          <span className="fs-5 fw-bold">
                            Thông tin lượt đi
                          </span>
                        </div>
                        <div className="col-12">
                          <table className="table table-borderless">
                            <tbody>
                              <tr>
                                <td className="text-secondary">Tuyến xe</td>
                                <td className="text-end text-secondary fw-bold">
                                  Trà Vinh - BX. Miền Tây
                                </td>
                              </tr>
                              <tr>
                                <td className="text-secondary">
                                  Thời gian xuất bến
                                </td>
                                <td className="text-end text-secondary fw-bold text-success">
                                  11:00 07/01/2025
                                </td>
                              </tr>
                              <tr>
                                <td className="text-secondary">Số lượng ghế</td>
                                <td className="text-end text-secondary fw-bold">
                                  1 Ghế
                                </td>
                              </tr>
                              <tr>
                                <td className="text-secondary">Số ghế</td>
                                <td className="text-end text-secondary fw-bold text-danger">
                                  A01
                                </td>
                              </tr>
                              <tr>
                                <td className="text-secondary">
                                  Điểm trả khách
                                </td>
                                <td className="text-end text-secondary fw-bold">
                                  BX. Miền Tây
                                </td>
                              </tr>
                              <tr>
                                <td className="text-secondary">
                                  Tổng tiền lượt đi
                                </td>
                                <td className="text-end text-secondary fw-bold">
                                  160.000đ
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="card z-index-4 rounded-4 shadow-lg mb-3 px-2 py-2">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-12 mb-3">
                          <span className="fs-5 fw-bold">
                            Thông tin lượt về
                          </span>
                        </div>
                        <div className="col-12">
                          <table className="table table-borderless">
                            <tbody>
                              <tr>
                                <td className="text-secondary">Tuyến xe</td>
                                <td className="text-end text-secondary fw-bold">
                                  BX. Miền Tây - Trà Vinh
                                </td>
                              </tr>
                              <tr>
                                <td className="text-secondary">
                                  Thời gian xuất bến
                                </td>
                                <td className="text-end text-secondary fw-bold text-success">
                                  11:00 07/01/2025
                                </td>
                              </tr>
                              <tr>
                                <td className="text-secondary">Số lượng ghế</td>
                                <td className="text-end text-secondary fw-bold">
                                  1 Ghế
                                </td>
                              </tr>
                              <tr>
                                <td className="text-secondary">Số ghế</td>
                                <td className="text-end text-secondary fw-bold text-danger">
                                  A01
                                </td>
                              </tr>
                              <tr>
                                <td className="text-secondary">
                                  Điểm trả khách
                                </td>
                                <td className="text-end text-secondary fw-bold">
                                  BX. Miền Tây
                                </td>
                              </tr>
                              <tr>
                                <td className="text-secondary">
                                  Tổng tiền lượt về
                                </td>
                                <td className="text-end text-secondary fw-bold">
                                  160.000đ
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div> */}
                  <div className="card z-index-4 rounded-4 shadow-lg mb-3 px-2 py-2">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-12 mb-3">
                          <span className="fs-5 fw-bold">Chi tiết giá</span>
                        </div>
                        <div className="col-12">
                          <table className="table table-borderless">
                            <tbody>
                              <tr>
                                <td className="text-secondary">
                                  Giá vé lượt đi
                                </td>
                                <td className="text-end text-secondary fw-bold ">
                                  160.000đ
                                </td>
                              </tr>
                              {/* <tr>
                                <td className="text-secondary">
                                  Giá vé lượt về
                                </td>
                                <td className="text-end text-secondary fw-bold">
                                  160.000đ
                                </td>
                              </tr> */}
                              <tr className="border-top">
                                <td className="text-secondary">Tổng tiền</td>
                                <td className="text-end text-secondary fw-bold text-danger">
                                  160.000đ
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <div className="d-flex justify-content-end gap-2">
                            <Link
                              className={`tp-btn-blue-sm inner-color alt-color-black tp-btn-hover d-inline-block border`}
                              style={{
                                backgroundColor: "#fff",
                                height: "34px",
                                lineHeight: "34px",
                                fontSize: "14px",
                                padding: "0 20px",
                              }}
                              href="/book-ticket"
                              onClick={(e) => {
                                e.preventDefault();
                                if (window.history.length > 1) {
                                  router.back();
                                } else {
                                  router.push("/default-page"); // Trang fallback
                                }
                              }}
                            >
                              <span className="text-secondary">Hủy</span>
                              <b
                                style={{
                                  transition: "all 0.5s ease",
                                  backgroundColor: "rgba(255, 58, 36, 0.2)",
                                }}
                              ></b>
                            </Link>
                            <Link
                              className={`tp-btn-blue-sm inner-color alt-color-black tp-btn-hover d-inline-block`}
                              style={{
                                backgroundColor: "rgb(239, 82, 34)",
                                height: "34px",
                                lineHeight: "34px",
                                fontSize: "14px",
                                padding: "0 20px",
                              }}
                              href="/book-ticket-info"
                            >
                              <span>Thanh toán</span>
                              <b style={{ transition: "all 0.5s ease" }}></b>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </Wrapper>
  );
};

export default index;
