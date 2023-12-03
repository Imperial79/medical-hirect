import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  const modalClasses = `text-black fixed top-0 left-0 w-full h-full flex items-center justify-center transition-opacity duration-300 ${
    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
  }`;

  return (
    <>
      <div className={modalClasses}>
        <div className="bg-gray-100/80 w-full h-full "></div>

        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="bg-white max-w-[40%] p-6 shadow-2xl opacity-100 transition-opacity duration-300 rounded-xl">
            {children}
            <button
              type="button"
              onClick={onClose}
              className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center light:bg-blue-600 light:hover:bg-blue-700 light:focus:ring-blue-800"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
