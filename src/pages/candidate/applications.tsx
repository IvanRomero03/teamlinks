import React from "react";
import Layout from "y/components/layout/layout";
import { api } from "y/utils/api";

const Applications = () => {
  const { data, error } =
    api.candidateRouter.application.getApplication.useQuery();
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
      <Layout
        Items={[
          { title: "Home", section: "candidate" },
          { title: "My Profile", section: "candidate/profile" },
          { title: "Applications", section: "candidate/applications" },
          { title: "Opportunities", section: "candidate/opportunities" },
        ]}
      >
        <div className="mt-20 p-10">
          <div className="m-auto w-3/4 overflow-y-auto rounded-lg border bg-white">
            <table className="w-full table-auto border-separate border-spacing-y-2 p-2">
              <thead>
                <tr>
                  <th className="py-2">Job Title:</th>
                  <th className="py-2">Main Tech:</th>
                  <th className="py-2">Country:</th>
                  <th className="py-2">Modality:</th>
                  <th className="py-2">Applied:</th>
                  <th className="py-2">Result:</th>
                </tr>
              </thead>
              {data?.aplicacion.map((application, id) => (
                <tbody key={id} className="">
                  <tr className="bg-gray-100 p-2 hover:bg-gray-200">
                    <td className="rounded-l-lg px-4 py-2">
                      {application.Puestos?.jobTitle}
                    </td>
                    <td className="px-4 py-2">
                      {application.Puestos?.mustHaves[0]?.name}
                    </td>
                    <td className="px-4 py-2">
                      {application.Puestos?.proyecto.pais}
                    </td>
                    <td className="px-4 py-2">{application.Puestos?.tipo}</td>
                    <td className="px-4 py-2">
                      {String(application.fechaCreacion.getDate()) +
                        "/" +
                        String(month[application.fechaCreacion.getMonth()]) +
                        "/" +
                        String(application.fechaCreacion.getFullYear())}
                    </td>
                    <td className="rounded-r-lg px-4 py-2">
                      <div
                        className={
                          application.estatus === "Not Selected"
                            ? "my-auto w-fit rounded-lg bg-red-300 p-1"
                            : application.estatus === "Selected"
                            ? "invisible h-0"
                            : application.estatus === "Under Consideration"
                            ? "invisible h-0"
                            : "invisible h-0"
                        }
                      >
                        <p className="text-sm text-gray-800">Not Selected</p>
                      </div>
                      <div
                        className={
                          application.estatus === "Not Selected"
                            ? "invisible h-0"
                            : application.estatus === "Selected"
                            ? "my-auto w-fit rounded-lg bg-green-300 p-1"
                            : application.estatus === "Under Consideration"
                            ? "invisible h-0"
                            : "invisible h-0"
                        }
                      >
                        <p className="text-sm text-gray-800">Selected</p>
                      </div>
                      <div
                        className={
                          application.estatus === "Not Selected"
                            ? "invisible h-0"
                            : application.estatus === "Selected"
                            ? "invisible h-0"
                            : application.estatus === "Under Consideration"
                            ? "my-auto w-fit rounded-lg bg-yellow-300 p-1"
                            : "invisible h-0"
                        }
                      >
                        <p className="text-sm text-gray-800">
                          Under Consideration
                        </p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Applications;
