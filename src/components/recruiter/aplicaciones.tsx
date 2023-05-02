import React from "react";
import { applicant_data } from "./data/applicant_data.js";

const Aplicantes = () => {
  return (
    <>
      <div
        className="relative col-span-1 m-auto h-[50vh] w-auto overflow-auto rounded-lg 
            border bg-white p-4 lg:h-[70vh]"
      >
        <h1 className="font-bold">Applications</h1>
        <ul>
          {applicant_data.map((application, id) => (
            <li
              key={id}
              className="my-3 flex cursor-pointer rounded-lg bg-gray-100 p-2 hover:bg-gray-200"
            >
              {/* Widget*/}
              <div className="flex justify-between">
                <div className="w-52 pl-4">
                  <p className="font-bold text-gray-800">{application.name}</p>
                  <div
                    className={
                      application.status === "Not Selected"
                        ? "w-fit rounded-lg bg-red-400 p-1"
                        : application.status === "Selected"
                        ? "w-fit rounded-lg bg-green-400 p-1"
                        : application.status === "Under Consideration"
                        ? "w-fit rounded-lg bg-yellow-400 p-1"
                        : "invisible h-0"
                    }
                  >
                    <p className="text-sm text-gray-800">
                      Status: {application.status}
                    </p>
                  </div>
                </div>
                <p className="my-auto w-36 pr-2 pl-4 text-sm text-gray-800 sm:hidden md:hidden lg:flex">
                  Main Technology:
                </p>
                <p className="my-auto w-20 pl-2 text-sm sm:hidden md:hidden lg:flex">
                  {application.date}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Aplicantes;
