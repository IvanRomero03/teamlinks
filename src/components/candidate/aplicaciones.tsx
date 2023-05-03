import { getRandomValues } from "crypto";
import React from "react";
import { api } from "y/utils/api";

const Aplicaciones = () => {
  const { data, error } =
    api.candidateRouter.application.getApplication.useQuery();
  function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  const icon = [
    "images/icons/cpp.png",
    "images/icons/css.png",
    "images/icons/js.png",
    "images/icons/mop.png",
    "images/icons/pc.png",
  ];
  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return (
    <>
      <div
        className="relative col-span-1 m-auto h-[50vh] w-auto overflow-auto rounded-lg 
            border bg-white p-4 lg:h-[70vh]"
      >
        <h1 className="font-bold">Applications</h1>
        <ul>
          {data?.aplicacion.map((application, id) => (
            <li key={id}>
              <div className="mt-5 flex cursor-pointer rounded-lg bg-gray-100 p-2 hover:bg-gray-200">
                <button className="flex">
                  {/* Insertar Iconos */}
                  <div className="my-auto rounded-lg bg-[#47d7ac] p-3">
                    <img
                      src={icon[getRandomInt(0, 4)]}
                      alt="icon"
                      className="h-6 w-6"
                    />
                  </div>
                  {/* Widget*/}
                  <div className="flex justify-between">
                    <div className="grid w-52 justify-items-center px-4">
                      <p className="font-bold text-gray-800 ">
                        {application.Puestos?.jobTitle}
                      </p>
                      <p className="my-auto text-sm sm:hidden md:hidden lg:flex">
                        Published:{" "}
                        {String(application.fechaCreacion.getDate()) +
                          "/" +
                          String(month[application.fechaCreacion.getMonth()]) +
                          "/" +
                          String(application.fechaCreacion.getFullYear())}
                      </p>
                    </div>
                    <div
                      className={
                        application.estatus === "Not Selected"
                          ? "my-auto w-fit rounded-md bg-red-300 p-1"
                          : application.estatus === "Selected"
                          ? "my-auto w-fit rounded-md bg-green-300 p-1"
                          : application.estatus === "Under Consideration"
                          ? "my-auto w-fit rounded-md bg-yellow-300 p-1"
                          : application.estatus === "Applied"
                          ? "my-auto w-fit rounded-md bg-blue-300 p-1"
                          : "hidden h-0"
                      }
                    >
                      <p className="text-sm text-gray-800 ">
                        Status: {application.estatus}
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Aplicaciones;
