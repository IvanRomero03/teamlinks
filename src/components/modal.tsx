import { useState } from "react";

function Modal({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const handleClose = () => {
    onClose();
  };

  return (
    <div
      className={
        "fixed inset-0 z-10 overflow-y-auto " + (isOpen ? "" : "hidden")
      }
    >
      <div className="flex min-h-screen items-center justify-center">
        <div
          className="fixed inset-0 bg-gray-500 opacity-75"
          onClick={handleClose}
        ></div>
        <div className="relative w-3/4 overflow-hidden rounded-lg bg-white">
          <div className="absolute top-0 right-0 pt-2 pr-2">
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <svg
                className="h-6 w-6 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M14.348 14.849a1.25 1.25 0 01-1.768 1.768l-6.18-6.18-6.18 6.18a1.25 1.25 0 11-1.768-1.768l6.18-6.18-6.18-6.18a1.25 1.25 0 111.768-1.768l6.18 6.18 6.18-6.18a1.25 1.25 0 111.768 1.768l-6.18 6.18z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div className="p-6">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
