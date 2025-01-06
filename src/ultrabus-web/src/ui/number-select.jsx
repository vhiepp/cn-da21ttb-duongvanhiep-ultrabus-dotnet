import { auto } from "@popperjs/core";
import { useState, useCallback, useRef, useEffect, use } from "react";
import { useClickAway } from "react-use";

const numbers = [1, 2, 3, 4, 5, 6, 7, 8];

const NumberSelect = ({
  placeholder,
  className,
  onChange,
  title,
  name,
  defaultOpen,
  defaultCurrent,
}) => {
  const [open, setOpen] = useState(defaultOpen || false);
  const [current, setCurrent] = useState(defaultCurrent || 1);
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
    if (defaultCurrent != current) setCurrent(defaultCurrent);
  }, [defaultCurrent]);

  useEffect(() => {
    if (defaultOpen != open) setOpen(defaultOpen);
  }, [defaultOpen]);

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
      <span className="current fw-bold">{current || placeholder}</span>

      <div
        className="list pb-3 px-3 border border-warning-subtle rounded-4 shadow-lg"
        style={{ top: -30, left: -1, width: 240 }}
      >
        <div className="row">
          <div className="col-12 fw-bold" style={{ lineHeight: 3 }}>
            {title || placeholder}
          </div>
        </div>
        <div className="row">
          {numbers.map((item, index) => (
            <div className="col-3 text-center px-0" key={index}>
              <button
                type="button"
                className="btn btn-light px-3"
                style={{
                  ...(current === item && {
                    color: "#fff",
                    backgroundColor: "var(--tp-common-yellow)",
                  }),
                }}
                onClick={() => currentHandler(item)}
              >
                {item}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NumberSelect;
