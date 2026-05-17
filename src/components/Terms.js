"use client";
import { useState } from "react";

export default function Terms({ termsconditions }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        className="border-liquorice text-gray mx-3 flex items-center text-xs font-normal focus:outline-none"
        onClick={() => setOpen(!open)}
      >
        Terms
        <svg
          viewBox="0 0 7 10"
          xmlns="http://www.w3.org/2000/svg"
          className={`ease-out-quint max-h-4 max-w-4 fill-none stroke-current transition-transform duration-500 ml-1 w-2 ${
            open ? "rotate-270" : "rotate-90"
          }`}
        >
          <path d="M1 1l4 4.018L1.034 9"></path>
        </svg>
      </button>

      {/* Collapse/Expand content */}
      {open && (
       <div
    className="termscondition mt-3 mx-3 text-xs text-gray-200"
    dangerouslySetInnerHTML={{ __html: termsconditions }}
  />
    // <div className="termscondition mt-2 text-sm text-gray-600">
        //   {termsconditions}
        // </div>
      )}
    </div>
  );
}
