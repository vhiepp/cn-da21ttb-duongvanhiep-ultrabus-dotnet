import React, { useEffect, useState } from "react";
import SEO from "@/common/seo";
import Wrapper from "@/layout/wrapper";
import BookTicketForm from "@/components/ticket/book-ticket-form";
import TripBusRouteCard from "@/components/ticket/trip-bus-route-card";
import { apiClient } from "@/configs/api-client";
import { set } from "react-hook-form";
import Link from "next/link";

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
  const [tickets, setTickets] = useState([]);

  const handleGetTickets = async () => {
    try {
      const response = await apiClient.get("/tickets/for-me");
      console.log(response.data.data);
      setTickets(response.data.data.reverse());
    } catch (error) {
      console.log(error);
    }
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

  useEffect(() => {
    handleGetTickets();
  }, []);

  return (
    <Wrapper>
      <SEO pageTitle={"Đặt vé xe"} />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main className="fix" style={{ minHeight: "80vh" }}>
            <div className="container" style={{ marginTop: "100px" }}>
              <div className="row mb-4">
                {tickets.map((ticket) => (
                  <div className="col-12 col-md-6 col-lg-4 mb-2">
                    <div className="card h-100">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-12 text-end">
                            {ticket.isPaid ? (
                              <small className="text-success">
                                Đã thanh toán
                              </small>
                            ) : (
                              <small className="text-danger">
                                Chưa thanh toán
                              </small>
                            )}
                          </div>
                          <div className="col-12">
                            <table className="table table-borderless">
                              <tbody>
                                <tr>
                                  <td className="text-secondary">Khách hàng</td>
                                  <td className="text-end text-secondary fw-bold">
                                    {ticket.customerName}
                                  </td>
                                </tr>
                                <tr>
                                  <td className="text-secondary">
                                    Số điện thoại
                                  </td>
                                  <td className="text-end text-secondary fw-bold">
                                    {ticket.phoneNumber}
                                  </td>
                                </tr>
                                <tr>
                                  <td className="text-secondary">Tuyến xe</td>
                                  <td className="text-end text-secondary fw-bold">
                                    BX. Trà Vinh - BX. Miền tây
                                  </td>
                                </tr>
                                <tr>
                                  <td className="text-secondary">
                                    Thời gian xuất bến
                                  </td>
                                  <td className="text-end text-secondary fw-bold text-success">
                                    {formatTime(ticket.departureTime)}{" "}
                                    {formatDate(ticket.departureDay)}
                                  </td>
                                </tr>
                                <tr>
                                  <td className="text-secondary">
                                    Số lượng ghế
                                  </td>
                                  <td className="text-end text-secondary fw-bold">
                                    {ticket.quantity} Ghế
                                  </td>
                                </tr>
                                <tr>
                                  <td className="text-secondary">Số ghế</td>
                                  <td className="text-end text-secondary fw-bold text-danger">
                                    {ticket.seatNumbers.join(", ")}
                                  </td>
                                </tr>
                                <tr>
                                  <td className="text-secondary">Tổng tiền</td>
                                  <td className="text-end text-secondary fw-bold">
                                    {ticket.totalPrice.toLocaleString("vi-VN")}đ
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div className="col-12 text-end">
                            {!ticket.isPaid && (
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
                                onClick={(e) => {
                                  e.preventDefault();
                                  handlePayment(ticket.id);
                                }}
                              >
                                <span>Thanh toán</span>
                                <b style={{ transition: "all 0.5s ease" }}></b>
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </Wrapper>
  );
};

export default index;
