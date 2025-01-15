import DateSelect from "@/ui/date-select";
import NiceSelect from "@/ui/nice-select";
import NumberSelect from "@/ui/number-select";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { set } from "react-hook-form";
import { date } from "yup";

const BookTicketForm = ({ onSearch }) => {
  const [provinces, setProvinces] = useState([]);
  const router = useRouter();
  const query = router.query;
  const nowDate = new Date();

  const [dataSearch, setDataSearch] = useState({
    from: null,
    to: null,
    date: `${nowDate.getFullYear()}-${
      nowDate.getMonth() + 1
    }-${nowDate.getDate()}`,
    quantity: 1,
    "round-trip": 0,
  });

  const [defaultOpen, setDefaultOpen] = useState({
    from: false,
    to: false,
    date: false,
    quantity: false,
  });

  useEffect(() => {
    if (query && provinces.length > 0) {
      let data = {
        from: query.from,
        to: query.to,
        date: !query.date
          ? `${nowDate.getFullYear()}-${
              nowDate.getMonth() + 1
            }-${nowDate.getDate()}`
          : query.date,
        quantity: isNaN(parseInt(query.quantity))
          ? 1
          : parseInt(query.quantity),
        "round-trip":
          !isNaN(parseInt(query["round-trip"])) &&
          parseInt(query["round-trip"]) == 1
            ? 1
            : 0,
      };
      if (onSearch && query.from && query.to) {
        let date = new Date(data.date);
        onSearch({
          ...data,
          fromProvince:
            provinces.length > 0 && query.from
              ? provinces.find((item) => item.value == query.from).text
              : "",
          toProvince:
            provinces.length > 0 && query.to
              ? provinces.find((item) => item.value == query.to).text
              : "",
          fullDate: `${date.getDate()}/${
            date.getMonth() + 1
          }/${date.getFullYear()}`,
        });
      }
      setDataSearch((prev) => ({
        ...prev,
        from: query.from,
        to: query.to,
        date: !query.date
          ? `${nowDate.getFullYear()}-${
              nowDate.getMonth() + 1
            }-${nowDate.getDate()}`
          : query.date,
        quantity: isNaN(parseInt(query.quantity))
          ? 1
          : parseInt(query.quantity),
        "round-trip":
          !isNaN(parseInt(query["round-trip"])) &&
          parseInt(query["round-trip"]) == 1
            ? 1
            : 0,
      }));
    }
  }, [query, provinces]);

  useEffect(() => {
    if (provinces.length > 0) return;
    fetch("http://localhost:5200/api/provinces")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        const prons = data.data.map((item) => ({
          value: item.id.toString(),
          text: item.name,
        }));
        setProvinces(prons);
      });
  }, []);

  const selectFromHandler = (e) => {
    setDataSearch((prev) => ({
      ...prev,
      from: e.value,
    }));
    setDefaultOpen((prev) => ({
      ...prev,
      from: false,
      to: !dataSearch.to,
      date: false,
      quantity: false,
    }));
  };

  const selectToHandler = (e) => {
    setDataSearch((prev) => ({
      ...prev,
      to: e.value,
    }));
    setDefaultOpen((prev) => ({
      ...prev,
      date: true,
      from: false,
      to: false,
      quantity: false,
    }));
  };

  // useEffect(() => {
  //   if (nowDate && !dataSearch.date) {
  //     setDataSearch((prev) => ({
  //       ...prev,
  //       date: `${nowDate.getFullYear()}-${
  //         nowDate.getMonth() + 1
  //       }-${nowDate.getDate()}`,
  //     }));
  //   }
  // }, []);

  const selectDateHandler = (e) => {
    // console.log(e);
    setDataSearch((prev) => ({
      ...prev,
      date: e,
    }));
    setDefaultOpen((prev) => ({
      ...prev,
      quantity: true,
      from: false,
      to: false,
      date: false,
    }));
  };

  const selectQuantityHandler = (e) => {
    setDataSearch((prev) => ({
      ...prev,
      quantity: e,
    }));
    setDefaultOpen((prev) => ({
      ...prev,
      from: false,
      to: false,
      date: false,
      quantity: false,
    }));
  };

  const selectRoundTripHandler = (e) => {
    setDataSearch((prev) => ({
      ...prev,
      "round-trip": e.target.value,
    }));
  };

  const handleSearchClick = (e) => {
    e.preventDefault();
    // console.log(dataSearch);
    if (!dataSearch.from) {
      setDefaultOpen((prev) => ({
        ...prev,
        from: true,
      }));
      return;
    }
    if (!dataSearch.to) {
      setDefaultOpen((prev) => ({
        ...prev,
        to: true,
      }));
      return;
    }
    if (!dataSearch.date) {
      setDefaultOpen((prev) => ({
        ...prev,
        date: true,
      }));
      return;
    }
    if (!dataSearch.quantity) {
      setDefaultOpen((prev) => ({
        ...prev,
        quantity: true,
      }));
      return;
    }
    if (onSearch) {
      let date = new Date(dataSearch.date);
      onSearch({
        ...dataSearch,
        fromProvince: provinces.find((item) => item.value == dataSearch.from)
          ?.text,
        toProvince: provinces.find((item) => item.value == dataSearch.to)?.text,
        fullDate: `${date.getDate()}/${
          date.getMonth() + 1
        }/${date.getFullYear()}`,
      });
    }
    router.push({
      pathname: "/book-ticket",
      query: dataSearch,
    });
  };

  // console.log(dataSearch);

  return (
    <div className="card z-index-5 rounded-4 shadow-lg pt-4 px-3">
      <div className="card-body">
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
                  checked={dataSearch["round-trip"] != 1}
                  name="round-trip"
                  id="inlineRadio1"
                  value="0"
                  onChange={selectRoundTripHandler}
                />
                <label
                  className="form-check-label fw-bold"
                  htmlFor="inlineRadio1"
                >
                  Một chiều
                </label>
              </div>
              {/* <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  style={{}}
                  checked={dataSearch["round-trip"] == 1}
                  type="radio"
                  name="round-trip"
                  id="inlineRadio2"
                  value="1"
                  onChange={selectRoundTripHandler}
                />
                <label
                  className="form-check-label fw-bold"
                  htmlFor="inlineRadio2"
                >
                  Khứ hồi
                </label>
              </div> */}
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
            <label htmlFor="" className="w-full text-start d-block ps-2">
              Điểm đi
            </label>
            <div className="postbox__select mb-30">
              {provinces.length > 0 && (
                <NiceSelect
                  options={provinces}
                  defaultCurrent={dataSearch.from}
                  placeholder="Chọn điểm đi"
                  title="Điểm đi"
                  defaultOpen={defaultOpen.from}
                  onChange={selectFromHandler}
                />
              )}
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <label htmlFor="" className="w-full text-start d-block ps-2">
              Điểm đến
            </label>
            <div className="postbox__select mb-30">
              {provinces.length > 0 && (
                <NiceSelect
                  options={provinces}
                  defaultCurrent={dataSearch.to}
                  // options={[{ value: "1", text: "Hồ Chí Minh" }]}
                  placeholder="Chọn điểm đến"
                  title="Điểm đến"
                  defaultOpen={defaultOpen.to}
                  onChange={selectToHandler}
                />
              )}
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <label htmlFor="" className="w-full text-start d-block ps-2">
              Ngày đi
            </label>
            <div className="postbox__select mb-30">
              <DateSelect
                placeholder="Chọn ngày đi"
                title="Ngày đi"
                defaultCurrent={dataSearch.date}
                defaultOpen={defaultOpen.date}
                onChange={selectDateHandler}
              />
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <label htmlFor="" className="w-full text-start d-block ps-2">
              Số lượng vé
            </label>
            <div className="postbox__select mb-30">
              <NumberSelect
                placeholder="Chọn số vé"
                title="Số vé"
                defaultOpen={defaultOpen.quantity}
                defaultCurrent={dataSearch.quantity}
                onChange={selectQuantityHandler}
              />
            </div>
          </div>
        </div>
        <div className="p-relative row justify-content-center">
          <div
            className="text-center"
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
              href="/book-ticket"
              onClick={handleSearchClick}
            >
              <span>Tìm chuyến xe</span>
              <b></b>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookTicketForm;
