import React from "react";
import NiceSelect from "../ui/nice-select";

const ContactUsForm = () => {
  const selectHandler = (e) => {};
  return (
    <>
      <form onSubmit={(e) => e.preventDefault()} className="box">
        <div className="row gx-20">
          <div className="col-12">
            <div className="postbox__comment-input mb-30">
              <input type="text" className="inputText" required />
              <span className="floating-label">Họ tên</span>
            </div>
          </div>
          <div className="col-12">
            <div className="postbox__comment-input mb-30">
              <input type="text" className="inputText" required />
              <span className="floating-label">Email</span>
            </div>
          </div>
          <div className="col-12">
            <div className="postbox__comment-input mb-35">
              <input type="text" className="inputText" required />
              <span className="floating-label">Số điện thoại</span>
            </div>
          </div>

          <div className="col-xxl-12">
            <div className="postbox__comment-input mb-30">
              <textarea className="textareaText" required></textarea>
              <span className="floating-label-2">Lời nhắn...</span>
            </div>
          </div>
          <div className="col-xxl-12">
            <div className="postbox__btn-box">
              <button
                className="submit-btn w-100"
                style={{ background: "var(--tp-theme-primary)" }}
              >
                Gửi đi
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default ContactUsForm;
