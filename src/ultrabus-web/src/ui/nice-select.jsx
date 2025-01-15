import { auto } from "@popperjs/core";
import { useState, useCallback, useRef, useEffect, use } from "react";
import { useClickAway } from "react-use";

const NiceSelect = ({
  options,
  defaultCurrent,
  placeholder,
  className,
  onChange,
  defaultOpen,
  title,
  name,
}) => {
  let searchProvinceHistory = [];
  if (typeof window !== "undefined") {
    const localStorageSearchHistory = JSON.parse(
      localStorage.getItem("searchHistory")
    );
    if (localStorageSearchHistory) {
      searchProvinceHistory = localStorageSearchHistory;
    }
  }
  // console.log(options);
  const [open, setOpen] = useState(defaultOpen || false);
  const [current, setCurrent] = useState(
    options.find((item) => item.value == defaultCurrent)
  );

  // console.log(options);
  const [optionsFilter, setOptionsFilter] = useState(options);
  const onClose = useCallback(() => {
    setOpen(false);
  }, []);
  const ref = useRef(null);
  const searchRef = useRef(null);

  useClickAway(ref, onClose);

  const currentHandler = (item) => {
    setCurrent(item);
    onChange(item);
    let searchHistory = JSON.parse(localStorage.getItem("searchHistory"));
    if (searchHistory) {
      if (searchHistory.length > 5) {
        searchHistory.pop();
      }
      searchHistory = searchHistory.filter((i) => i.value != item.value);
      searchHistory.unshift(item);
      localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
    } else {
      localStorage.setItem("searchHistory", JSON.stringify([item]));
    }
    onClose();
  };

  useEffect(() => {
    if (open) {
      searchRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    // console.log({ defaultOpen });
    if (defaultOpen != open) setOpen(defaultOpen);
  }, [defaultOpen]);

  useEffect(() => {
    // console.log({ defaultCurrent, options });
    if (defaultCurrent) {
      setCurrent(options.find((item) => item.value == defaultCurrent));
    }
  }, [defaultCurrent]);

  // console.log({ current });

  // useEffect(() => {
  //   setOptionsFilter((prev) => [...prev, ...options]);
  // }, []);

  // console.log({ optionsFilter });

  // Hàm lọc options theo chuỗi tìm kiếm
  const filterOptions = (search) => {
    // console.log({ search });
    if (search && search.length > 0) {
      const newOptions = options.filter((item) =>
        normalizeString(item.text).includes(normalizeString(search))
      );
      setOptionsFilter((prev) => [...newOptions]);
    } else {
      setOptionsFilter(options);
    }
  };

  // Hàm chuẩn hóa chuỗi
  function normalizeString(str) {
    return (
      str
        .toLowerCase() // Chuyển về chữ thường
        // .replace(/[^\w\s]/gi, '') // Loại bỏ ký tự đặc biệt
        // bỏ dấu tiếng việt
        .replace(/tỉnh/g, "")
        .replace(/huyện/g, "")
        .replace(/phường/g, "")
        .replace(/xã/g, "")
        .replace(/thành phố/g, "")
        .replace(/thị trấn/g, "")
        .replace(/ /g, "")
        .replace(/a|á|à|ả|ã|ạ|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/g, "a")
        .replace(/e|é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/g, "e")
        .replace(/i|í|ì|ỉ|ĩ|ị/g, "i")
        .replace(/o|ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/g, "o")
        .replace(/u|ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/g, "u")
        .replace(/y|ý|ỳ|ỷ|ỹ|ỵ/g, "y")
        .replace(/d|đ/g, "d")
        .replace(/\s+/g, " ") // Loại bỏ khoảng trắng thừa
        // bo chu province va district
        .replace(/province/g, "")
        .replace(/district/g, "")
        .replace(/city/g, "")
        .replace(/ward/g, "")
        // bỏ các ký tự đặc biệt
        .replace(/[^\w\s]/gi, "")
        .trim()
    ); // Xóa khoảng trắng đầu và cuối chuỗi
  }

  return (
    <div
      className={`nice-select ${(className, (open || defaultOpen) && "open")}`}
      role="button"
      tabIndex={0}
      onClick={() => {
        if (!open) setOpen(true);
      }}
      onKeyPress={(e) => e}
      ref={ref}
      style={{ height: "auto", padding: "0.5rem 1.2rem" }}
    >
      <span className="current fw-bold">{current?.text || placeholder}</span>

      <div
        className="list pb-4 px-3 border border-warning-subtle rounded-4 shadow-lg"
        style={{ top: -30, left: -10, width: 320 }}
      >
        <div className="row">
          <div className="col-12 fw-bold" style={{ lineHeight: 3 }}>
            {title || placeholder}
          </div>
        </div>
        <div className="col-12">
          <div className="postbox__comment-input">
            <input
              type="text"
              className="inputText"
              placeholder="Tìm kiếm..."
              onChange={(e) => {
                filterOptions(e.target.value);
              }}
              ref={searchRef}
            />
            <span
              className="floating-label"
              style={{ color: "var(--tp-theme-primary)", lineHeight: "13px" }}
            >
              Tìm kiếm
            </span>
          </div>
        </div>
        <div className="col-12">
          <label className="fw-bold">TỈNH/ THÀNH PHỐ</label>
        </div>
        <ul
          role="menubar"
          onClick={(e) => e.stopPropagation()}
          onKeyPress={(e) => e.stopPropagation()}
          style={{
            maxHeight: 200,
            overflowY: "auto",
            scrollbarWidth: "thin" /* Thanh cuộn nhỏ (Firefox) */,
            scrollbarColor:
              "var(--tp-theme-primary) #f4f4f4" /* Màu thanh cuộn và nền (Firefox) */,

            /* Custom scrollbar cho trình duyệt WebKit (Chrome, Edge, Safari) */
            "--webkit-scrollbar-width": "8px" /* Độ rộng thanh cuộn */,
            "--webkit-scrollbar-track-background":
              "#f4f4f4" /* Nền thanh cuộn */,
            "--webkit-scrollbar-thumb-background":
              "var(--tp-theme-primary)" /* Màu thanh cuộn */,
          }}
        >
          {optionsFilter.map((item) => {
            // console.log(item);
            return (
              <li
                key={item.value + Math.random()}
                data-value={item.value}
                className={`option ${
                  item.value === current?.value && "selected focus"
                }`}
                role="menuitem"
                onClick={() => currentHandler(item)}
                onKeyPress={(e) => e}
              >
                {item.text}
              </li>
            );
          })}
        </ul>
        {searchProvinceHistory.length > 0 && (
          <div className="row">
            <div className="col-12">
              <label className="fw-bold" style={{ lineHeight: 0 }}>
                TÌM KIẾM GẦN ĐÂY
              </label>
            </div>
            <div
              className="col-12"
              style={{ display: "flex", flexWrap: "wrap", gap: 5 }}
            >
              {searchProvinceHistory.map((item, index) => (
                <button
                  type="button"
                  key={`button-${index}`}
                  className="btn btn-light btn-sm rounded-3"
                  onClick={() => currentHandler(item)}
                >
                  {item.text}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NiceSelect;
