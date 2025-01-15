import { auto } from "@popperjs/core";
import { useState, useCallback, useRef, useEffect, use } from "react";
import { useClickAway } from "react-use";

const BusStationSelect = ({
  options,
  defaultCurrent,
  placeholder,
  className,
  onChange,
  defaultOpen,
  title,
  name,
}) => {
  // console.log(options);
  const [open, setOpen] = useState(defaultOpen || false);
  const [current, setCurrent] = useState(options[0]);

  const onClose = useCallback(() => {
    setOpen(false);
  }, []);
  const ref = useRef(null);

  useClickAway(ref, onClose);

  const currentHandler = (item) => {
    setCurrent(item);
    onChange(item);
    onClose();
  };

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
      <span className="current fw-bold fs-6">
        {current?.name || placeholder}
      </span>

      <div
        className="list pb-4 px-3 border border-warning-subtle rounded-4 shadow-lg"
        style={{ top: -30, left: -10, width: 360 }}
      >
        <div className="row">
          <div className="col-12 fw-bold" style={{ lineHeight: 3 }}>
            {title || placeholder}
          </div>
        </div>
        <ul
          role="menubar"
          onClick={(e) => e.stopPropagation()}
          onKeyPress={(e) => e.stopPropagation()}
          style={{
            maxHeight: 230,
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
          {options.map((item) => {
            // console.log(item);
            return (
              <div className="d-flex align-items-center py-2" key={item.value}>
                <div
                  className="h-full d-flex align-items-center"
                  style={{ lineHeight: 0, minWidth: "16px" }}
                >
                  {item.value === current?.value && (
                    <i
                      className="fa fa-check-circle"
                      style={{ color: "var(--tp-theme-primary)" }}
                    ></i>
                  )}
                </div>
                <div className="flex-grow-1 ps-2">
                  <li
                    key={item.value + Math.random()}
                    data-value={item.value}
                    className={`option ${
                      item.value === current?.value && "selected focus"
                    }`}
                    role="menuitem"
                    style={{
                      minHeight: "22px",
                      lineHeight: "22px",
                      paddingLeft: 0,
                    }}
                    onClick={() => currentHandler(item)}
                    onKeyPress={(e) => e}
                  >
                    {item.name}
                    <p
                      className="m-0"
                      style={{
                        fontSize: "12px",
                        lineHeight: "16px",
                        height: "16px",
                      }}
                    >
                      {item.address}
                    </p>
                  </li>
                </div>
                <div>
                  <i className="fas fa-map-marked-alt text-success fs-5"></i>
                </div>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default BusStationSelect;
