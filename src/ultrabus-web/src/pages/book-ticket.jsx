import React, { useState } from "react";
import SEO from "@/common/seo";
import Wrapper from "@/layout/wrapper";
import BookTicketForm from "@/components/ticket/book-ticket-form";
import TripBusRouteCard from "@/components/ticket/trip-bus-route-card";
import { apiClient } from "@/configs/api-client";
import { set } from "react-hook-form";

const timeFilter = [
  {
    id: 1,
    name: "Sáng sớm 00:00 - 06:00",
    from: new Date(0, 0, 0, 0, 0, 0),
    to: new Date(0, 0, 0, 6, 59, 0),
  },
  {
    id: 2,
    name: "Buổi sáng 06:00 - 12:00",
    from: new Date(0, 0, 0, 6, 0, 0),
    to: new Date(0, 0, 0, 11, 59, 0),
  },
  {
    id: 3,
    name: "Buổi chiều 12:00 - 18:00",
    from: new Date(0, 0, 0, 12, 0, 0),
    to: new Date(0, 0, 0, 17, 59, 0),
  },
  {
    id: 4,
    name: "Buổi tối 18:00 - 24:00",
    from: new Date(0, 0, 0, 18, 0, 0),
    to: new Date(0, 0, 0, 23, 59, 0),
  },
];

const busTypeFilter = [
  {
    id: 1,
    name: "Ghế ngồi",
  },
  {
    id: 2,
    name: "Giường nằm",
  },
];

const index = () => {
  const [selectedTimeFilter, setSelectedTimeFilter] = useState([]); // Lưu trữ giờ đi được chọn
  const [selectedBusTypeFilter, setSelectedBusTypeFilter] = useState([]); // Lưu trữ loại xe được chọn
  const [busRouteTrip, setBusRouteTrip] = useState(null);
  const [searchData, setSearchData] = useState({});
  //   const router = useRouter();
  //   const query = router.query;

  //   console.log(query);

  const handleSelectTimeFilter = (id) => {
    let index = selectedTimeFilter.indexOf(id);
    if (index === -1) {
      setSelectedTimeFilter((prev) => [...prev, id]);
    } else {
      setSelectedTimeFilter((prev) => prev.filter((item) => item !== id));
    }
  };

  const handleSelectBusTypeFilter = (id) => {
    let index = selectedBusTypeFilter.indexOf(id);
    if (index === -1) {
      setSelectedBusTypeFilter((prev) => [...prev, id]);
    } else {
      setSelectedBusTypeFilter((prev) => prev.filter((item) => item !== id));
    }
  };

  const handleOnSearch = async (dataSearch) => {
    setSearchData(dataSearch);
    // console.log(dataSearch);
    if (!dataSearch.from || !dataSearch.to) return;
    let date = dataSearch.date.split("-");
    let newDate = new Date(date[0], date[1] - 1, date[2], 7, 0, 0);
    // console.log(newDate.toISOString());
    const res = await apiClient.get("/bus-route-trips/search", {
      params: {
        StartProvinceId: dataSearch.from,
        EndProvinceId: dataSearch.to,
        Date: newDate.toISOString(),
        MinTicket: dataSearch.quantity,
      },
    });
    if (res.data.data) {
      // console.log(res.data.data);
      let data = res.data.data;
      // sort by departure time
      data.sort((a, b) => {
        return new Date(a.departureTime) - new Date(b.departureTime);
      });
      setBusRouteTrip(data);
    }
  };

  // console.log(searchData);

  return (
    <Wrapper>
      <SEO pageTitle={"Đặt vé xe"} />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main className="fix" style={{ minHeight: "80vh" }}>
            <div className="container" style={{ marginTop: "100px" }}>
              <BookTicketForm onSearch={handleOnSearch} />
              {busRouteTrip != null &&
                (busRouteTrip.length === 0 ? (
                  <p className="my-5 text-danger text-center">
                    Chưa tìm thấy chuyến đi nào!
                  </p>
                ) : (
                  <div className="row my-4 py-4">
                    <div className="col-12 col-lg-4">
                      <div className="card z-index-4 rounded-4 shadow-lg mb-3 px-2 py-2">
                        <div className="card-body">
                          <div className="row justify-content-between mb-4">
                            <div className="col-6 text-start">
                              <span className="fw-bold">BỘ LỌC TÌM KIẾM</span>
                            </div>
                            <div
                              className="col-6 text-end text-danger"
                              // onClick={() => setSelectedTimeFilter([])}
                            >
                              <i
                                className="fas fa-trash-alt ms-2"
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  setSelectedTimeFilter([]);
                                  setSelectedBusTypeFilter([]);
                                }}
                              ></i>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-12">
                              <span className="h6 mb-3 d-block">Giờ đi</span>
                            </div>
                            <div className="col-12 ps-4 mb-3">
                              {timeFilter.map((item, index) => (
                                <div
                                  className="form-check fs-6 d-flex align-items-center mb-2"
                                  key={`time-filter-${item.id}`}
                                >
                                  <input
                                    className="form-check-input me-2 mb-1"
                                    type="checkbox"
                                    value=""
                                    id={`flexCheckDefault${item.id}`}
                                    checked={selectedTimeFilter.includes(index)}
                                    onChange={() =>
                                      handleSelectTimeFilter(index)
                                    }
                                  />
                                  <label
                                    className="form-check-label"
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
                              style={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 12,
                              }}
                            >
                              {busTypeFilter.map((item, index) => (
                                <button
                                  type="button"
                                  className={`btn btn-outline-dark btn-sm rounded-2 px-3 border ${
                                    selectedBusTypeFilter.includes(item.id)
                                      ? "bg-dark text-light"
                                      : ""
                                  }`}
                                  onClick={() =>
                                    handleSelectBusTypeFilter(item.id)
                                  }
                                  key={`bus-type-filter-${index}`}
                                >
                                  {item.name}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-lg-8">
                      <div className="row">
                        <div className="col-12 mb-4">
                          <span className="fs-4 fw-bold">
                            {searchData.fromProvince} - {searchData.toProvince}{" "}
                            ({searchData.fullDate})
                          </span>
                        </div>
                        {busRouteTrip.map((item, index) => {
                          if (selectedTimeFilter.length > 0) {
                            let check = false;
                            for (
                              let i = 0;
                              i < selectedTimeFilter.length;
                              i++
                            ) {
                              // console.log(new Date(item.departureTime).getHours());
                              // console.log(
                              //   timeFilter[selectedTimeFilter[i]].from.getHours()
                              // );
                              if (
                                new Date(item.departureTime).getHours() >=
                                  timeFilter[
                                    selectedTimeFilter[i]
                                  ].from.getHours() &&
                                new Date(item.departureTime).getHours() <=
                                  timeFilter[
                                    selectedTimeFilter[i]
                                  ].to.getHours()
                              ) {
                                check = true;
                                break;
                              }
                            }

                            if (!check) return null;
                          }
                          if (selectedBusTypeFilter.length > 0) {
                            if (
                              !selectedBusTypeFilter.includes(item.bus.busType)
                            )
                              return null;
                          }
                          return (
                            <div
                              className="col-12"
                              key={`bus-route-trip-${index}`}
                            >
                              <TripBusRouteCard
                                item={item}
                                date={searchData.date}
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </main>
        </div>
      </div>
    </Wrapper>
  );
};

export default index;
