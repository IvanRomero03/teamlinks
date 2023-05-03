import React from "react";
import Layout from "y/components/layout/layout";
import { api } from "y/utils/api";



const Opportunities = () => {
  const { data, error } = api.candidateRouter.getOpportuninties.useQuery();
  const [collapseOpen, setCollapseOpen] = React.useState(false);
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
                    <th className="py-2">Status:</th>
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
                        <td className="px-4 py-2 rounded-r-lg">
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

export default Opportunities;
