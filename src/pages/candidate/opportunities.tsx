import React from "react";
import Layout from "y/components/layout/layout";
import { api } from "y/utils/api";
import { useState } from "react";
import Modal from "y/components/modal";
import Link from "next/link";


const Opportunities = () => {
  const { data, error } = api.candidateRouter.getOpportuninties.useQuery();
  const [modalOpen, setModalOpen] = useState(false);

  function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  const icon = [
    "/images/icons/cpp.png",
    "/images/icons/css.png",
    "/images/icons/js.png",
    "/images/icons/mop.png",
    "/images/icons/pc.png",
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
  ]

  return (
    <>
      <Layout
        Items={[
          { title: "Home", section: "candidate" },
          { title: "My Profile", section: "candidate/profile" },
          { title: "Applications", section: "candidate/applications" },
          { title: "Opportunities", section: "candidate/opportunities" },
        ]}
      >
        <div className="mt-20 p-10">
          <div className="m-auto w-3/4 overflow-y-auto rounded-lg border bg-white p-4">
            <table className="table-auto w-full border-separate border-spacing-y-2 p-2">
              <thead>
                <tr>
                    <th className="py-2">Job Title:</th>
                    <th className="py-2">Main Tech:</th>
                    <th className="py-2">Country:</th>
                    <th className="py-2">Modality:</th>
                    <th className="py-2">Published:</th>
                </tr>
              </thead>
              {data?.map((opportunity, id) => (
                <tbody>
                    <tr key={id} className="rounded-lg bg-gray-100 p-2 hover:bg-gray-200">
                        <td className="px-4 py-2 rounded-l-lg">{opportunity.jobTitle}</td>
                        <td className="px-4 py-2 capitalize">{opportunity.mustHaves[0]?.name}</td>
                        <td className="px-4 py-2">{opportunity.proyecto.pais}</td>
                        <td className="px-4 py-2">{opportunity.tipo}</td>
                        <td className="px-4 py-2">{opportunity.fechaCreacion.getDate()+ "/" + month[opportunity.fechaCreacion.getMonth()] + "/" + opportunity.fechaCreacion.getFullYear()}</td>
                        <td className="rounded-r-lg">
                          <button
                            className={
                              opportunity.numPosicionesDisponibles >= 15
                              ? "my-1 rounded-lg bg-green-300 p-3 text-sm font-bold hover:bg-green-400"
                              : opportunity.numPosicionesDisponibles > 0
                              ? "my-1 rounded-lg bg-yellow-300 p-3 text-sm font-bold hover:bg-yellow-400"
                              : "invisible h-0 w-0"
                            }
                            onClick={() => setModalOpen(true)}
                          >
                            Apply
                          </button>
                        </td>
                    </tr>
                    {modalOpen && (
                      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                        <>
                          <div className="w-auto rounded-lg bg-gray-300 p-2">
                            <div className="flex justify-start p-2">
                              <img src={icon[getRandomInt(0, 4)]} alt="icon" className="my-auto h-10 w-10" />
                              <p className="p-2 text-2xl font-bold text-gray-800">{opportunity.jobTitle}</p>
                            </div>
                            <div className="flex justify-start p-2">
                              <div className="px-1">
                                <p className="pr-2 font-bold text-gray-800">Status:</p>
                                <div
                                  className={
                                    opportunity.numPosicionesDisponibles === 0
                                      ? "my-auto h-fit w-fit rounded-lg bg-red-400 p-1"
                                      : opportunity.numPosicionesDisponibles >= 15
                                      ? "invisible h-0"
                                      : opportunity.numPosicionesDisponibles < 15
                                      ? "invisible h-0"
                                      : "invisible h-0 w-0"
                                  }
                                >
                                  <p className="text-sm text-gray-800">Closed</p>
                                </div>
                                <div
                                  className={
                                    opportunity.numPosicionesDisponibles === 0
                                      ? "invisible h-0"
                                      : opportunity.numPosicionesDisponibles >= 15
                                      ? "my-auto h-fit w-fit rounded-lg bg-green-400 p-1"
                                      : opportunity.numPosicionesDisponibles < 15
                                      ? "invisible h-0"
                                      : "invisible h-0 w-0"
                                  }
                                >
                                  <p className="text-sm text-gray-800">Open</p>
                                </div>
                                <div
                                  className={
                                    opportunity.numPosicionesDisponibles === 0
                                      ? "invisible h-0"
                                      : opportunity.numPosicionesDisponibles >= 15
                                      ? "invisible h-0"
                                      : opportunity.numPosicionesDisponibles < 15
                                      ? "my-auto h-fit w-fit rounded-lg bg-yellow-400 p-1"
                                      : "invisible h-0 w-0"
                                  }
                                >
                                  <p className="text-sm text-gray-800">Restricted</p>
                                </div>
                              </div>
                            </div>
                            <div className="flex justify-between p-2">
                              <div className="px-1">
                                <p className="font-bold text-gray-800">Location:</p>
                                <p className="text-gray-800">{opportunity.proyecto.pais}</p>
                              </div>
                              <div className="px-1">
                                <p className="font-bold text-gray-800">Hours per Week:</p>
                                <p className="text-gray-800">20 hrs</p>
                              </div>
                              <div className="px-1">
                                <p className="font-bold text-gray-800">Modality:</p>
                                <p className="text-gray-800">{opportunity.tipo}</p>
                              </div>
                              <div className="px-1">
                                <p className="font-bold text-gray-800">Position:</p>
                                <p className="text-gray-800">{opportunity.estatus === "Open" ? "Open" : "Closed"}</p>
                              </div>
                              <div className="px-1">
                                <p className="font-bold text-gray-800">Main Technology:</p>
                                <p className="text-gray-800">{opportunity.mustHaves[0]?.name}</p>
                              </div>
                              <div className="px-1">
                                <p className="font-bold text-gray-800">Published:</p>
                                <p className="text-gray-800">{opportunity.fechaCreacion.getDate() + "/" + month[opportunity.fechaCreacion.getMonth()] + "/" + opportunity.fechaCreacion.getFullYear()}</p>
                              </div>
                            </div>
                            <div className="p-2">
                              <p className="font-bold text-gray-800">Description:</p>
                              <p className="pl-2 text-gray-800">{opportunity.descripcion}</p>
                            </div>
                            <div className="p-2">
                              <p className="font-bold text-gray-800">Skills:</p>
                              <ul className="flex justify-start">
                                {opportunity.mustHaves.map((skill) => (
                                  <p className='text-gray-800 bg-gray-400 rounded-md p-1 mx-1 capitalize'>{skill.name}</p>
                                ))}
                              </ul>
                            </div>
                            <div className="flex justify-center p-2">
                              <Link className="w-full" href={"/candidate/profile?id=" + id}>
                                <button
                                  className={
                                    opportunity.numPosicionesDisponibles >= 15
                                      ? "my-auto ml-3 w-full rounded-lg bg-[#47d7ac] p-3 text-sm font-bold hover:bg-[#0f172a]  hover:text-white"
                                      : opportunity.numPosicionesDisponibles > 0
                                      ? "my-auto ml-2 w-full rounded-lg bg-[#47d7ac] p-3 text-sm font-bold hover:bg-[#0f172a]  hover:text-white"
                                      : "invisible h-0"
                                  }
                                >
                                  Apply
                                </button>
                              </Link>
                            </div>
                          </div>
                        </>
                      </Modal>
                    )}
                </tbody>
              ))}
            </table>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Opportunities;
