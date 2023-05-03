import React, { useState } from "react";
import Layout from "y/components/layout/layout";
import { api } from "y/utils/api";

const Applications = () => {
  const { data, error } = api.candidateRouter.application.getApplication.useQuery();
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

  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSort = (column) => {
    if (sortColumn === column) {
      // If the same column is clicked, reverse the sort order
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // Otherwise, sort by the clicked column in ascending order
      setSortColumn(column);
      setSortOrder("asc");
    }	
  };

  const getSortArrow = (column) => {
    if (sortColumn === column) {
      return sortOrder === "asc" ? <span>&uarr;</span> : <span>&darr;</span>;
    }
    return null;
  };

  // Sort the data based on the current sort column and order
  const sortedData = data?.aplicacion.sort((a, b) => {
    if (sortColumn === "jobTitle") {
      return sortOrder === "asc"
        ? a.Puestos.jobTitle.localeCompare(b.Puestos.jobTitle)
        : b.Puestos.jobTitle.localeCompare(a.Puestos.jobTitle);
    } else if (sortColumn === "mainTech") {
      return sortOrder === "asc"
        ? a.Puestos.mustHaves[0]?.name.localeCompare(b.Puestos.mustHaves[0]?.name)
        : b.Puestos.mustHaves[0]?.name.localeCompare(a.Puestos.mustHaves[0]?.name);
    } else if (sortColumn === "country") {
      return sortOrder === "asc"
        ? a.Puestos.proyecto.pais.localeCompare(b.Puestos.proyecto.pais)
        : b.Puestos.proyecto.pais.localeCompare(a.Puestos.proyecto.pais);
    } else if (sortColumn === "modality") {
      return sortOrder === "asc"
        ? a.Puestos.tipo.localeCompare(b.Puestos.tipo)
        : b.Puestos.tipo.localeCompare(a.Puestos.tipo);
    } else if (sortColumn === "applied") {
      return sortOrder === "asc"
        ? a.fechaCreacion - b.fechaCreacion
        : b.fechaCreacion - a.fechaCreacion;
    } else if (sortColumn === "result") {
      // Not sorting by result column
      return 0;
    } else {
      // No sorting by default
      return 0;
    }
  });

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
            <table className="table-auto w-full border-separate border-spacing-y-2 p-2">
              <thead>
                <tr>
                  <th className="py-2 cursor-pointer" onClick={() => handleSort("jobTitle")}>
                    Job Title {getSortArrow("jobTitle")}
                  </th>
                  <th className="py-2 cursor-pointer" onClick={() => handleSort("mainTech")}>
                    Main Tech {getSortArrow("mainTech")}
                  </th>
                  <th className="py-2 cursor-pointer" onClick={() => handleSort("country")}>
                    Country {getSortArrow("country")}
                  </th>
                  <th className="py-2 cursor-pointer" onClick={() => handleSort("modality")}>
                    Modality {getSortArrow("modality")}
                  </th>
                  <th className="py-2 cursor-pointer" onClick={() => handleSort("applied")}>
                    Applied {getSortArrow("applied")}
                  </th>
                  <th className="py-2 cursor-pointer" onClick={() => handleSort("result")}>
                    Result 
                  </th>
                </tr>
              </thead>
              {sortedData?.map((application, id) => (
                <tbody>
                  <tr key={id} className="bg-gray-100 p-2 hover:bg-gray-200">
                    <td className="px-4 py-2 rounded-l-lg">
                      {application.Puestos?.jobTitle}
                    </td>
                    <td className="px-4 py-2 capitalize">
                      {application.Puestos?.mustHaves[0]?.name}
                    </td>
                    <td className="px-4 py-2">{application.Puestos?.proyecto.pais}</td>
                    <td className="px-4 py-2">{application.Puestos?.tipo}</td>
                    <td className="px-4 py-2">
                      {application.fechaCreacion.getDate() +
                        "/" +
                        month[application.fechaCreacion.getMonth()] +
                        "/" +
                        application.fechaCreacion.getFullYear()}
                    </td>
                    <td className="px-4 py-2 rounded-r-lg">
                      <div
                        className={(application.estatus === 'Not Selected' ? 'p-1 rounded-lg bg-red-300 w-fit my-1 p-2' :
                          application.estatus === 'Selected' ? 'invisible h-0' :
                            application.estatus === 'Under Consideration' ? 'invisible h-0' :
                              application.estatus === 'Applied' ? 'invisible h-0' : 'invisible h-0')}
                      >
                        <p className="text-sm text-gray-800">Not Selected</p>
                      </div>
                      <div
                        className={(application.estatus === 'Not Selected' ? 'invisible h-0' :
                          application.estatus === 'Selected' ? 'p-1 rounded-lg bg-green-300 w-fit my-1 p-2' :
                            application.estatus === 'Under Consideration' ? 'invisible h-0' :
                              application.estatus === 'Applied' ? 'invisible h-0' : 'invisible h-0')}
                      >
                        <p className="text-sm text-gray-800">Selected</p>
                      </div>
                      <div
                        className={(application.estatus === 'Not Selected' ? 'invisible h-0' :
                          application.estatus === 'Selected' ? 'invisible h-0' :
                            application.estatus === 'Under Consideration' ? 'p-1 rounded-lg bg-yellow-300 w-fit my-1 p-2' :
                              application.estatus === 'Applied' ? 'invisible h-0' : 'invisible h-0')}
                      >
                        <p className="text-sm text-gray-800">Under Consideration</p>
                      </div>
                      <div
                        className={(application.estatus === 'Not Selected' ? 'invisible h-0' :
                          application.estatus === 'Selected' ? 'invisible h-0' :
                            application.estatus === 'Under Consideration' ? 'invisible h-0' :
                              application.estatus === 'Applied' ? 'p-1 rounded-lg bg-gray-300 w-fit my-1 p-2' : 'invisible h-0')}
                      >
                        <p className="text-sm text-gray-800">Applied</p>
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
