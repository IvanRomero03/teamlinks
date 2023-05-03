import React from "react";
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
                    <th className="py-2">Job Title:</th>
                    <th className="py-2">Main Tech:</th>
                    <th className="py-2">Country:</th>
                    <th className="py-2">Modality:</th>
                    <th className="py-2">Applied:</th>
                    <th className="py-2">Result:</th>
                </tr>
              </thead>
              {data?.aplicacion.map((application, id) => (
                <tbody>
                    <tr key={id} className="bg-gray-100 p-2 hover:bg-gray-200">
                        <td className="px-4 py-2 rounded-l-lg">{application.Puestos?.jobTitle}</td>
                        <td className="px-4 py-2 capitalize">{application.Puestos?.mustHaves[0]?.name}</td>
                        <td className="px-4 py-2">{application.Puestos?.proyecto.pais}</td>
                        <td className="px-4 py-2">{application.Puestos?.tipo}</td>
                        <td className="px-4 py-2">{application.fechaCreacion.getDate()+ "/" + month[application.fechaCreacion.getMonth()] + "/" + application.fechaCreacion.getFullYear()}</td>
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
