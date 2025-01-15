import SEO from "@/common/seo";
import { apiClient } from "@/configs/api-client";
import { fetcher, setToken } from "@/functions";
import Wrapper from "@/layout/wrapper";
import BusStationSelect from "@/ui/bus-station-select";
import DateSelect from "@/ui/date-select";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { set } from "react-hook-form";
import useSWR from "swr";

// import seatIcon from "@/public/app-assets/img/icons/icons8-seat-50.png";
// import shape_2 from "../../../../public/assets/img/cta/cta-shape-5-2.png";

function formatTime(dateString) {
  const date = new Date(dateString);
  const hours = date.getHours().toString().padStart(2, "0"); // Lấy giờ và thêm số 0 nếu cần
  const minutes = date.getMinutes().toString().padStart(2, "0"); // Lấy phút và thêm số 0 nếu cần
  return `${hours}:${minutes}`;
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0"); // Lấy ngày và thêm số 0 nếu cần
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Lấy tháng và thêm số 0 nếu cần
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

const index = () => {
  const router = useRouter();
  const [busRouteTrip, setBusRouteTrip] = useState(null);
  const [chooseSeat, setChooseSeat] = useState([]);

  const { data, error } = useSWR("/auth/profile", fetcher);

  useEffect(() => {
    if (!!data) {
      setCustomerInfo((prev) => ({
        ...prev,
        fullName: data.fullName.trim(),
        phoneNumber: data.phoneNumber,
        email: data.email,
      }));
    }
  }, [data]);

  const [customerInfo, setCustomerInfo] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
  });

  const [otpCode, setOtpCode] = useState("");
  const [otpData, setOtpData] = useState(null);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);

  const [isAcceptTerms, setIsAcceptTerms] = useState(true);

  const { query } = router;

  // console.log(query);

  const getBusRouteTrip = async () => {
    if (!query.tripId || !query.date) return;
    let dateData = new Date(query.date);
    dateData.setHours(7, 0, 0, 0);
    const res = await apiClient.get(`/bus-route-trips/${query.tripId}`, {
      params: {
        date: dateData.toISOString(),
      },
    });
    const data = res.data.data;
    // console.log(data);
    setBusRouteTrip(data);
  };

  const handleChooseSeat = (seat) => {
    console.log(seat);
    if (chooseSeat.includes(seat)) {
      setChooseSeat(chooseSeat.filter((item) => item !== seat));
    } else {
      setChooseSeat([...chooseSeat, seat]);
    }
  };

  useEffect(() => {
    if (!!query) {
      getBusRouteTrip();
    }
  }, [query]);

  const handleChangePhoneNumber = (e) => {
    let value = e.target.value;
    value = value.replace(/\D/g, "");

    // Định dạng thành dạng số điện thoại: 0123-456-789
    if (value.length > 3 && value.length <= 7) {
      value = `${value.slice(0, 4)}${value.slice(4)}`;
    } else if (value.length > 7) {
      value = `${value.slice(0, 4)}${value.slice(4, 7)}${value.slice(7, 11)}`;
    }

    setCustomerInfo((prev) => ({
      ...prev,
      phoneNumber: value,
    }));
  };

  const handleVerifyOTP = async (value) => {
    if (!value) return;
    const res = await apiClient.post("/auth/login-with-phone-number", {
      phoneNumber: customerInfo.phoneNumber,
      code: value,
      key: otpData.key,
      firstName: customerInfo.fullName,
    });
    const data = res.data.data;
    if (data && data.accessToken) {
      setToken(data.accessToken);
      setIsVerifyingOtp(true);
    }
    // console.log(otpData);
    console.log(data);
  };

  const handleChangeOTPCode = (e) => {
    let value = e.target.value;
    value = value.replace(/\D/g, "");
    setOtpCode(value);
    if (value.length === 4) {
      handleVerifyOTP(value);
    }
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (!customerInfo.phoneNumber || customerInfo.phoneNumber.length < 10) {
      return;
    }
    const res = await apiClient.post("/otps/send-otp-phone-number", {
      phoneNumber: customerInfo.phoneNumber,
    });
    const data = res.data.data;
    // console.log(data);
    setOtpData(data);
    setIsSendingOtp(true);
  };

  const checkOk = () => {
    return (
      data &&
      chooseSeat.length > 0 &&
      customerInfo.fullName &&
      customerInfo.phoneNumber &&
      isAcceptTerms
    );
  };

  const handlePayment = async (ticketId) => {
    const res = await apiClient.post("/payment/ticket", {
      ticketId: ticketId,
      cancelUrl: "http://localhost:3001/ticket",
      returnUrl: "http://localhost:3001/ticket",
    });
    const data = res.data.data;
    console.log(data);
    if (data) {
      window.location.href = data.checkoutUrl;
    }
  };

  const handleBookTicket = async (e) => {
    e.preventDefault();
    if (!checkOk()) return;
    if (!query.tripId) return;
    if (!query.date) return;
    let date = new Date(query.date);
    date.setHours(7, 0, 0, 0);
    const res = await apiClient.post("/tickets", {
      busRouteTripId: query.tripId,
      date: date.toISOString(),
      customerName: customerInfo.fullName,
      phoneNumber: customerInfo.phoneNumber,
      email: customerInfo.email,
      seatNumbers: chooseSeat,
      busStationUpId: busRouteTrip.busRoute.startStation.id,
      busStationDownId: busRouteTrip.busRoute.endStation.id,
    });
    const data = res.data.data;
    handlePayment(data.id);
  };

  return (
    <Wrapper>
      <SEO pageTitle={"Đặt vé xe"} />
      {busRouteTrip && (
        <div id="smooth-wrapper">
          <div id="smooth-content">
            <main className="fix" style={{ minHeight: "80vh" }}>
              <div className="container" style={{ marginTop: "100px" }}>
                <div className="row pb-4">
                  <div className="col-12">
                    <h3 className="text-center">
                      {busRouteTrip.busRoute.startStation.province.name} -{" "}
                      {busRouteTrip.busRoute.endStation.province.name}
                    </h3>
                  </div>
                  <div className="col-12 col-lg-8">
                    <div className="card z-index-4 rounded-4 shadow-lg mb-3 px-2 py-2">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-12 mb-3">
                            <span className="fs-5 fw-bold">Chọn ghế</span>
                          </div>
                          <div className="col-12 d-flex flex-wrap justify-content-center">
                            {busRouteTrip.bus.seatArrangement.map(
                              (floor, floorIndex) => {
                                return (
                                  <div
                                    className="text-center me-2"
                                    key={`floor-${floorIndex}`}
                                  >
                                    <span className="">
                                      Tầng {floorIndex + 1}
                                    </span>
                                    <table
                                      className="table table-borderless"
                                      style={{ width: "220px" }}
                                    >
                                      <tbody>
                                        {floor.map((row, rowIndex) => {
                                          return (
                                            <tr
                                              key={`floor-${floorIndex}row-${rowIndex}`}
                                            >
                                              {row.map((seat, seatIndex) =>
                                                seat != "" ? (
                                                  <td
                                                    className="text-center px-3"
                                                    key={`floor-${floorIndex}row-${rowIndex}seat-${seatIndex}`}
                                                  >
                                                    <div
                                                      className={
                                                        "p-relative d-flex justify-content-center align-items-center rounded-2 px-1 py-2 " +
                                                        (!chooseSeat.includes(
                                                          seat
                                                        ) &&
                                                        !busRouteTrip.seatSelectds.includes(
                                                          seat
                                                        )
                                                          ? "bg-light text-info"
                                                          : "") +
                                                        " " +
                                                        (busRouteTrip.seatSelectds.includes(
                                                          seat
                                                        )
                                                          ? "bg-light text-secondary"
                                                          : "")
                                                      }
                                                      style={{
                                                        ...(!busRouteTrip.seatSelectds.includes(
                                                          seat
                                                        )
                                                          ? {
                                                              cursor: "pointer",
                                                            }
                                                          : {
                                                              cursor:
                                                                "not-allowed",
                                                            }),
                                                        color:
                                                          "var(--tp-theme-primary)",
                                                        backgroundColor:
                                                          "rgba(211, 117, 40, 0.1)",
                                                      }}
                                                      onClick={() => {
                                                        if (
                                                          !busRouteTrip.seatSelectds.includes(
                                                            seat
                                                          )
                                                        )
                                                          handleChooseSeat(
                                                            seat
                                                          );
                                                      }}
                                                    >
                                                      <img
                                                        src={
                                                          "/app-assets/img/icons/icons8-seat-50.png"
                                                        }
                                                        alt="seat"
                                                        style={{
                                                          width: "20px",
                                                          opacity: 0.1,
                                                        }}
                                                      />
                                                      <span
                                                        className="d-block fs-6 text-center fw-bold"
                                                        style={{
                                                          position: "absolute",
                                                        }}
                                                      >
                                                        {seat}
                                                      </span>
                                                    </div>
                                                  </td>
                                                ) : (
                                                  <td
                                                    className="text-center px-3"
                                                    key={`floor-${floorIndex}row-${rowIndex}seat-${seatIndex}`}
                                                  ></td>
                                                )
                                              )}
                                            </tr>
                                          );
                                        })}
                                      </tbody>
                                    </table>
                                  </div>
                                );
                              }
                            )}
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
                                        value={customerInfo.fullName}
                                        onChange={(e) =>
                                          setCustomerInfo((prev) => ({
                                            ...prev,
                                            fullName: e.target.value,
                                          }))
                                        }
                                      />
                                      <span className="floating-label">
                                        Họ và tên{" "}
                                        <span className="text-danger">*</span>
                                      </span>
                                    </div>
                                  </div>
                                  <div className="col-12 was-validated">
                                    <div className="postbox__comment-input mb-30">
                                      <input
                                        type="text"
                                        className="inputText"
                                        required
                                        value={customerInfo.phoneNumber}
                                        onChange={handleChangePhoneNumber}
                                        maxlength="12"
                                      />
                                      <span className="floating-label">
                                        Số điện thoại{" "}
                                        <span className="text-danger">*</span>
                                      </span>
                                      <div
                                        className="valid-feedback ps-2"
                                        style={
                                          isVerifyingOtp
                                            ? { display: "block" }
                                            : { display: "none" }
                                        }
                                      >
                                        Xác thực số điện thoại thành công
                                      </div>
                                    </div>
                                  </div>
                                  {!data && isSendingOtp && !isVerifyingOtp && (
                                    <div className="col-12 was-validated">
                                      {/* <small>
                                        <i>Gửi mã OTP thành công</i>
                                      </small> */}
                                      <div className="postbox__comment-input mb-30">
                                        <input
                                          type="text"
                                          className="inputText text-center"
                                          required
                                          value={otpCode}
                                          onChange={handleChangeOTPCode}
                                          maxlength="4"
                                        />
                                        <span className="floating-label">
                                          Nhập mã OTP{" "}
                                          <span className="text-danger">*</span>
                                        </span>
                                        <div
                                          className="invalid-feedback ps-2"
                                          style={
                                            !isVerifyingOtp &&
                                            otpCode.length === 4
                                              ? { display: "block" }
                                              : { display: "none" }
                                          }
                                        >
                                          Mã OTP không chính xác
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                  {!isSendingOtp &&
                                    !data &&
                                    customerInfo.phoneNumber.length >= 10 && (
                                      <div className="col-12">
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
                                          onClick={handleSendOTP}
                                        >
                                          <span className="text-secondary">
                                            Gửi mã xác thực
                                          </span>
                                          <b
                                            style={{
                                              transition: "all 0.5s ease",
                                              backgroundColor:
                                                "rgba(255, 58, 36, 0.2)",
                                            }}
                                          ></b>
                                        </Link>
                                      </div>
                                    )}
                                  <div className="col-12">
                                    <div className="form-check">
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value=""
                                        id="flexCheckDefault"
                                        checked={isAcceptTerms}
                                        onChange={(e) =>
                                          setIsAcceptTerms(e.target.checked)
                                        }
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="flexCheckDefault"
                                      >
                                        <span className="text-danger">
                                          Chấp nhận điều khoản
                                        </span>{" "}
                                        đặt vé & chính sách bảo mật thông tin
                                        của chúng tôi
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
                                <p
                                  className=""
                                  style={{ textAlign: "justify" }}
                                >
                                  (*) Quý khách vui lòng có mặt tại bến xuất
                                  phát của xe trước ít nhất 30 phút giờ xe khởi
                                  hành, mang theo thông báo đã thanh toán vé
                                  thành công có chứa mã vé được gửi từ hệ thống.
                                  Vui lòng liên hệ Trung tâm tổng đài{" "}
                                  <span className="text-danger">1900 2307</span>{" "}
                                  để được hỗ trợ.
                                </p>
                                <p
                                  className=""
                                  style={{ textAlign: "justify" }}
                                >
                                  (*) Nếu quý khách có nhu cầu trung chuyển, vui
                                  lòng liên hệ Tổng đài trung chuyển{" "}
                                  <span className="text-danger">
                                    1900 2307{" "}
                                  </span>
                                  trước khi đặt vé. Chúng tôi không đón/trung
                                  chuyển tại những điểm xe trung chuyển không
                                  thể tới được.
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
                                        value:
                                          busRouteTrip.busRoute.startStation.id,
                                        name: busRouteTrip.busRoute.startStation
                                          .name,
                                        address:
                                          busRouteTrip.busRoute.startStation
                                            .address +
                                          ", " +
                                          busRouteTrip.busRoute.startStation
                                            .province.name,
                                        latitude:
                                          busRouteTrip.busRoute.startStation
                                            .latitude,
                                        longitude:
                                          busRouteTrip.busRoute.startStation
                                            .longitude,
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
                                  <span className="text-danger">45 phút</span>{" "}
                                  giờ khởi hành để được xe trung chuyển đến đón
                                  hoặc có mặt tại Bến xe/Văn Phòng trước{" "}
                                  <span className="text-danger">15 phút</span>{" "}
                                  để kiểm tra thông tin trước khi lên xe.
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
                                        value:
                                          busRouteTrip.busRoute.endStation.id,
                                        name: busRouteTrip.busRoute.endStation
                                          .name,
                                        address:
                                          busRouteTrip.busRoute.endStation
                                            .address +
                                          ", " +
                                          busRouteTrip.busRoute.endStation
                                            .province.name,
                                        latitude:
                                          busRouteTrip.busRoute.endStation
                                            .latitude,
                                        longitude:
                                          busRouteTrip.busRoute.endStation
                                            .longitude,
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
                                    {busRouteTrip.busRoute.startStation.name} -{" "}
                                    {busRouteTrip.busRoute.endStation.name}
                                  </td>
                                </tr>
                                <tr>
                                  <td className="text-secondary">
                                    Thời gian xuất bến
                                  </td>
                                  <td className="text-end text-secondary fw-bold text-success">
                                    {formatTime(busRouteTrip.departureTime)}{" "}
                                    {formatDate(query.date)}
                                  </td>
                                </tr>
                                <tr>
                                  <td className="text-secondary">
                                    Số lượng ghế
                                  </td>
                                  <td className="text-end text-secondary fw-bold">
                                    {chooseSeat.length} Ghế
                                  </td>
                                </tr>
                                <tr>
                                  <td className="text-secondary">Số ghế</td>
                                  <td className="text-end text-secondary fw-bold text-danger">
                                    {chooseSeat.join(", ")}
                                  </td>
                                </tr>
                                <tr>
                                  <td className="text-secondary">
                                    Điểm trả khách
                                  </td>
                                  <td className="text-end text-secondary fw-bold">
                                    {busRouteTrip.busRoute.endStation.name}
                                  </td>
                                </tr>
                                <tr>
                                  <td className="text-secondary">
                                    Tổng tiền lượt đi
                                  </td>
                                  <td className="text-end text-secondary fw-bold">
                                    {(
                                      chooseSeat.length * busRouteTrip.price
                                    ).toLocaleString("vi-VN")}
                                    đ
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
                                    {(
                                      chooseSeat.length * busRouteTrip.price
                                    ).toLocaleString("vi-VN")}
                                    đ
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
                                    {(
                                      chooseSeat.length * busRouteTrip.price
                                    ).toLocaleString("vi-VN")}
                                    đ
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
                                  ...(!checkOk()
                                    ? { cursor: "not-allowed" }
                                    : {}),
                                }}
                                href="/book-ticket-info"
                                onClick={handleBookTicket}
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
      )}
    </Wrapper>
  );
};

export default index;
