import { auto } from "@popperjs/core";
import { useState, useCallback, useRef, useEffect, use } from "react";
import { set } from "react-hook-form";
import { useClickAway } from "react-use";

const weekDays = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

const DateSelect = ({
  placeholder,
  className,
  onChange,
  title,
  name,
  defaultCurrent,
  defaultOpen,
}) => {
  const [open, setOpen] = useState(defaultOpen || false);
  const [current, setCurrent] = useState({
    text: "",
    value: "",
    day: -1,
    month: -1,
    year: -1,
  });
  const [selectDay, setSelectDay] = useState({
    day: -1,
    month: -1,
    year: -1,
    weekday: 0,
  });

  const onClose = useCallback(() => {
    setOpen(false);
  }, []);
  const ref = useRef(null);

  useClickAway(ref, onClose);

  useEffect(() => {
    if (defaultCurrent) {
      const defaultDate = new Date(defaultCurrent);
      if (
        defaultDate.getDate() != selectDay.day ||
        defaultDate.getMonth() != selectDay.month - 1 ||
        defaultDate.getFullYear() != selectDay.year
      ) {
        // console.log(defaultCurrent);
        setSelectDay({
          day: defaultDate.getDate(),
          month: defaultDate.getMonth() + 1,
          year: defaultDate.getFullYear(),
          weekday: defaultDate.getDay(),
        });
      }
    }
  }, [defaultCurrent]);

  useEffect(() => {
    if (defaultOpen != open) setOpen(defaultOpen);
  }, [defaultOpen]);

  // const currentHandler = (item) => {
  //   setCurrent(item);
  //   onChange(item, name);
  //   onClose();
  // };

  const handleNext = () => {
    if (Number.parseInt(current.month) === 12) {
      setCurrent((prev) => ({
        ...prev,
        text: `01/${current.year + 1}`,
        day: "01",
        month: "01",
        year: current.year + 1,
      }));
    } else {
      setCurrent((prev) => ({
        ...prev,
        text: `${
          Number.parseInt(current.month) + 1 < 10
            ? `0${Number.parseInt(current.month) + 1}`
            : Number.parseInt(current.month) + 1
        }/${current.year}`,
        day:
          Number.parseInt(current.month) + 1 < 10
            ? `0${Number.parseInt(current.month) + 1}`
            : Number.parseInt(current.month) + 1,
        month:
          Number.parseInt(current.month) + 1 < 10
            ? `0${Number.parseInt(current.month) + 1}`
            : Number.parseInt(current.month) + 1,
        year: current.year,
      }));
    }
  };

  const handlePrevious = () => {
    if (Number.parseInt(current.month) === 1) {
      setCurrent((prev) => ({
        ...prev,
        text: `12/${current.year - 1}`,
        day: "01",
        month: "12",
        year: current.year - 1,
      }));
    } else {
      setCurrent((prev) => ({
        ...prev,
        text: `${
          Number.parseInt(current.month) - 1 < 10
            ? `0${Number.parseInt(current.month) - 1}`
            : Number.parseInt(current.month) - 1
        }/${current.year}`,
        day:
          Number.parseInt(current.month) - 1 < 10
            ? `0${Number.parseInt(current.month) - 1}`
            : Number.parseInt(current.month) - 1,
        month:
          Number.parseInt(current.month) - 1 < 10
            ? `0${Number.parseInt(current.month) - 1}`
            : Number.parseInt(current.month) - 1,
        year: current.year,
      })); // Giảm tháng
    }
  };

  const handleChangeDate = (day, i) => {
    setSelectDay((prev) => ({
      day,
      month: Number.parseInt(current.month),
      year: current.year,
      weekday: i === 6 ? 0 : i + 1,
    }));
    onChange(`${current.year}-${Number.parseInt(current.month)}-${day}`);
    onClose();
  };

  useEffect(() => {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    setSelectDay({
      day,
      month,
      year,
      weekday: date.getDay(),
    });
    day = day < 10 ? `0${day}` : day;
    month = month < 10 ? `0${month}` : month;
    setCurrent((prev) => ({
      ...prev,
      text: `${month}/${year}`,
      day,
      month,
      year,
    }));
  }, []);

  const dateTable = () => {
    if (current.day === -1 || current.month === -1 || current.year === -1) {
      return <></>;
    }
    // console.log(current);
    const nowDate = new Date();
    const date = new Date(current.year, Number.parseInt(current.month) - 1, 1);
    let weekdayFirst = date.getDay() - 1; // Ngày đầu tiên của tháng
    // console.log({ weekdayFirst });
    const daysInMonth = new Date(
      current.year,
      Number.parseInt(current.month),
      0
    ).getDate(); // Số ngày trong tháng
    const dateTable = [];
    let dateRow = [];
    if (weekdayFirst < 0) {
      weekdayFirst = 6;
    }
    for (let i = 0; i < weekdayFirst; i++) {
      dateRow.push("");
    }
    for (let i = 1; i <= daysInMonth; i++) {
      dateRow.push(i);
      if (dateRow.length === 7) {
        dateTable.push(dateRow);
        dateRow = [];
      }
    }
    for (
      let i = 0;
      i < 7 * (dateTable.length + 1) - weekdayFirst - daysInMonth;
      i++
    ) {
      dateRow.push("");
    }
    // console.log(35 - weekdayFirst - daysInMonth);
    if (dateRow.length > 0) {
      dateTable.push(dateRow);
    }
    return dateTable.map((row, index) => (
      <tr key={index}>
        {row.map((day, i) => (
          <td
            key={i}
            className="p-0"
            style={{
              ...(day == nowDate.getDate() &&
              Number.parseInt(current.month) == nowDate.getMonth() + 1 &&
              current.year == nowDate.getFullYear()
                ? { color: "#fff", backgroundColor: "var(--tp-common-blue-3)" }
                : {}),
              ...(day == selectDay.day &&
              Number.parseInt(current.month) == selectDay.month &&
              current.year == selectDay.year
                ? { color: "#fff", backgroundColor: "var(--tp-common-yellow)" }
                : {}),
              ...(day &&
              day < nowDate.getDate() &&
              Number.parseInt(current.month) == nowDate.getMonth() + 1 &&
              current.year == nowDate.getFullYear()
                ? { color: "var(--tp-grey-2)" }
                : {}),
            }}
            onClick={() => {
              if (day) {
                if (
                  day < nowDate.getDate() &&
                  Number.parseInt(current.month) == nowDate.getMonth() + 1 &&
                  current.year == nowDate.getFullYear()
                ) {
                  return;
                }
                handleChangeDate(day, i);
              }
            }}
          >
            {day}
          </td>
        ))}
      </tr>
    ));
  };

  return (
    <div
      className={`nice-select ${(className, open && "open")}`}
      role="button"
      tabIndex={0}
      onClick={() => {
        if (!open) setOpen(true);
      }}
      onKeyPress={(e) => e}
      ref={ref}
      style={{ height: "auto", padding: "0.5rem 1.2rem" }}
    >
      <span className="current fw-bold">
        {`${weekDays[selectDay.weekday]}, ${
          selectDay.day < 10 ? `0${selectDay.day}` : selectDay.day
        }/${selectDay.month < 10 ? `0${selectDay.month}` : selectDay.month}/${
          selectDay.year
        }`}
      </span>

      <div
        className="list pb-1 px-3 border border-warning-subtle rounded-4 shadow-lg"
        style={{ top: -30, left: -10, width: 360 }}
      >
        <div className="row">
          <div className="col-12 fw-bold" style={{ lineHeight: 3 }}>
            {title || placeholder}
          </div>
        </div>
        <div className="col-12 mb-3">
          <div className="postbox__comment-input">
            <input
              type="text"
              className="inputText"
              value={`${weekDays[selectDay.weekday]}, ${
                selectDay.day < 10 ? `0${selectDay.day}` : selectDay.day
              }/${
                selectDay.month < 10 ? `0${selectDay.month}` : selectDay.month
              }/${selectDay.year}`}
              disabled
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="row text-center">
              {new Date().getMonth() == Number.parseInt(current.month) - 1 &&
              new Date().getFullYear() <= current.year ? (
                <div className="col-2 p-0"></div>
              ) : (
                <div className="col-2 p-0" onClick={handlePrevious}>
                  <i className="fal fa-arrow-left"></i>
                </div>
              )}

              <div className="col-8 p-0">THÁNG {current.text}</div>
              <div className="col-2 p-0" onClick={handleNext}>
                <i className="fal fa-arrow-right"></i>
              </div>
            </div>
          </div>
          <div className="col-12">
            <table className="table table-bordered text-center">
              <thead className="table-borderless">
                <tr>
                  <th className="p-0">T.2</th>
                  <th className="p-0">T.3</th>
                  <th className="p-0">T.4</th>
                  <th className="p-0">T.5</th>
                  <th className="p-0">T.6</th>
                  <th className="p-0">T.7</th>
                  <th className="p-0">CN</th>
                </tr>
              </thead>
              <tbody>{dateTable()}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateSelect;
