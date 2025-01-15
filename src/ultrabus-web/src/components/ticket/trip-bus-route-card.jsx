import Link from "next/link";
import { useRouter } from "next/router";

function formatTime(dateString) {
  const date = new Date(dateString);
  const hours = date.getHours().toString().padStart(2, "0"); // Lấy giờ và thêm số 0 nếu cần
  const minutes = date.getMinutes().toString().padStart(2, "0"); // Lấy phút và thêm số 0 nếu cần
  return `${hours}:${minutes}`;
}

const busTypes = ["", "Ghế ngồi", "Giường nằm"];

const TripBusRouteCard = ({ item, date }) => {
  const router = useRouter();

  const handleChooseTrip = (e) => {
    e.preventDefault();
    router.push({
      pathname: "/book-ticket-info",
      query: {
        tripId: item.id,
        date: date,
      },
    });
  };

  return (
    <div className="card z-index-4 rounded-4 shadow-lg mb-3 px-2 py-1">
      <div className="card-body">
        <div className="row">
          <div className="col-12 mb-3">
            <div className="row justify-content-between">
              <div className="col-12 col-md-8">
                <div className="row">
                  <div className="col-12">
                    <div className="d-flex justify-content-between">
                      <div>
                        <span className="fs-3">
                          {formatTime(item.departureTime)}
                        </span>
                      </div>
                      <div className="align-self-center flex-grow-1 px-2">
                        <div className="d-flex gap-1 justify-content-between align-items-center">
                          <div>
                            <i className="fas fa-circle fs-6 text-success"></i>
                          </div>
                          <div
                            className="flex-grow-1 border-secondary"
                            style={{ borderTop: "2px dotted" }}
                          ></div>
                          <div className="text-center">
                            <div>
                              <span className="fs-6 fw-bold text-secondary">
                                {item.totalHours > 0
                                  ? `${item.totalHours} giờ`
                                  : ""}{" "}
                                {item.totalMinutes > 0
                                  ? `${item.totalMinutes} phút`
                                  : ""}
                              </span>
                            </div>
                            <div>
                              <span>(Asia/Ho Chi Minh)</span>
                            </div>
                          </div>
                          <div
                            className="flex-grow-1 border-secondary"
                            style={{ borderTop: "2px dotted" }}
                          ></div>
                          <div>
                            <i className="fas fa-map-marker-alt fs-5 text-danger"></i>
                          </div>
                        </div>
                      </div>
                      <div>
                        <span className="fs-3">
                          {formatTime(item.arrivalTime)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="row justify-content-between">
                      <div className="col-6">{item.startStation.name}</div>
                      <div className="col-6 text-end">
                        {item.endStation.name}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-4 text-end">
                <div className="row align-items-between">
                  <div className="col-12">
                    <i
                      className="fas fa-circle me-1"
                      style={{ color: "#ccc", fontSize: "8px" }}
                    ></i>
                    <span style={{ fontSize: "12px" }}>
                      {busTypes[item.bus.busType]}
                    </span>
                    <i
                      className="fas fa-circle me-1 ms-2"
                      style={{ color: "#ccc", fontSize: "8px" }}
                    ></i>
                    <span style={{ fontSize: "14px" }} className="fw-bold">
                      {item.totalSeatEmptys} chỗ trống
                    </span>
                  </div>
                  <div className="col-12 mt-3">
                    <span className="fs-4 text-danger fw-bold">
                      {item.price.toLocaleString("vi-VN")}đ
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div
            className="col-12 mt-1"
            style={{ display: "flex", flexWrap: "wrap", gap: 12 }}
          >
            <div className="flex-grow-1">
              <button
                type="button"
                className="btn btn-sm btn-link text-secondary"
                style={{ fontSize: "14px", textDecoration: "none" }}
              >
                Lịch trình
              </button>
              <button
                type="button"
                className="btn btn-sm btn-link text-secondary"
                style={{ fontSize: "14px", textDecoration: "none" }}
              >
                Trung chuyển
              </button>
              <button
                type="button"
                className="btn btn-sm btn-link text-secondary"
                style={{ fontSize: "14px", textDecoration: "none" }}
              >
                Chính sách
              </button>
            </div>
            <div className="">
              <Link
                className={`tp-btn-blue-sm inner-color alt-color-black tp-btn-hover d-inline-block`}
                style={{
                  backgroundColor: "rgb(239, 82, 34)",
                  height: "34px",
                  lineHeight: "34px",
                  fontSize: "14px",
                  padding: "0 20px",
                }}
                href="#"
                onClick={(e) => handleChooseTrip(e)}
              >
                <span>Chọn chuyến</span>
                <b></b>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripBusRouteCard;
