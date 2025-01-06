import React from "react";
import SEO from "@/common/seo";
import Wrapper from "@/layout/wrapper";
import BookTicketForm from "@/components/ticket/book-ticket-form";
import TripBusRouteCard from "@/components/ticket/trip-bus-route-card";

const data = [1, 2, 3, 4, 5, 6];

const index = () => {
  const timeFilter = [
    {
      id: 1,
      name: "Sáng sớm 00:00 - 06:00",
    },
    {
      id: 2,
      name: "Buổi sáng 06:00 - 12:00",
    },
    {
      id: 3,
      name: "Buổi chiều 12:00 - 18:00",
    },
    {
      id: 4,
      name: "Buổi tối 18:00 - 24:00",
    },
  ];
  //   const router = useRouter();
  //   const query = router.query;

  //   console.log(query);

  return (
    <Wrapper>
      <SEO pageTitle={"Đặt vé xe"} />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main className="fix" style={{ minHeight: "80vh" }}>
            <div className="container" style={{ marginTop: "100px" }}>
              <BookTicketForm />
              <div className="row my-4 py-4">
                <div className="col-12 col-lg-4">
                  <div className="card z-index-4 rounded-4 shadow-lg mb-3 px-2 py-2">
                    <div className="card-body">
                      <div className="row justify-content-between mb-4">
                        <div className="col-6 text-start">
                          <span className="fw-bold">BỘ LỌC TÌM KIẾM</span>
                        </div>
                        <div className="col-6 text-end text-danger">
                          Xóa lọc
                          <i className="fas fa-trash-alt ms-2"></i>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12">
                          <span className="h6 mb-3 d-block">Giờ đi</span>
                        </div>
                        <div className="col-12 ps-4 mb-3">
                          {timeFilter.map((item) => (
                            <div
                              class="form-check fs-6 d-flex align-items-center mb-2"
                              key={item.id}
                            >
                              <input
                                class="form-check-input me-2 mb-1"
                                type="checkbox"
                                value=""
                                id={`flexCheckDefault${item.id}`}
                              />
                              <label
                                class="form-check-label"
                                for={`flexCheckDefault${item.id}`}
                              >
                                {item.name}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-12">
                          <span className="h6 mb-3 d-block">Loại xe</span>
                        </div>
                        <div
                          className="col-12"
                          style={{ display: "flex", flexWrap: "wrap", gap: 12 }}
                        >
                          <button
                            type="button"
                            className="btn btn-outline-dark btn-sm rounded-2 px-3 border"
                          >
                            Ghế
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline-dark btn-sm rounded-2 px-3 border"
                          >
                            Giường nằm
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-8">
                  <div className="row">
                    <div className="col-12 mb-4">
                      <span className="fs-4 fw-bold">
                        Trà Vinh - TP. Hồ Chí Minh (6)
                      </span>
                    </div>
                    {data.map((item) => (
                      <div className="col-12" key={item}>
                        <TripBusRouteCard />
                      </div>
                    ))}
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
