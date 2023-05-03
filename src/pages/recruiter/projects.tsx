import { type NextPage } from "next";
import { useState } from "react";
import Layout from "y/components/layout/layout";
import { applicant_data } from "y/components/recruiter/data/applicant_data.js";
import { application_individual } from "y/components/applicant.js";
import { proyects_data } from "y/components/proyects.js";
import { positions } from "y/components/position_jobs.js";

import { RiUser3Fill, RiArrowLeftCircleFill } from "react-icons/ri";

import { api } from "y/utils/api";

const Projects: NextPage = () => {
  const [toggleState, setToggleState] = useState(0);
  const [idProyecto, setidProyecto] = useState("");

  const [toggleState2, setToggleState2] = useState(0);

  const toggleTab = (index: number, targetUser: number) => {
    setToggleState(index);
    setToggleState2(targetUser);
  };

  const { data, error, isLoading } = api.recruiterInfo.getProyects.useQuery();

  const { data: puestos, error: errorPuestos } =
    api.recruiterInfo.getProyectInfo.useQuery({ id: idProyecto });

  return (
    <Layout
      Items={[
        { title: "Home", section: "recruiter" },
        { title: "My User", section: "recruiter/user" },
        { title: "My Projects", section: "recruiter/projects" },
        { title: "Applications", section: "recruiter/applications" },
      ]}
    >
      <div
        className={
          toggleState === 0 ? "m-auto mt-20 w-[75rem] p-10" : "tab-content"
        }
      >
        <div className="m-auto w-full overflow-y-auto rounded-lg border bg-white p-4">
          <div className="my-3 grid cursor-pointer grid-cols-2 items-center justify-between p-2 sm:grid-cols-3 md:grid-cols-4">
            <span>Project</span>
            <span className="text-right sm:text-left">Status</span>
            <span className="hidden sm:grid">Description</span>
          </div>
          <ul>
            {data?.map((proyect, id) => (
              <li
                onClick={() => {
                  toggleTab(1, id);
                  setToggleState(1);
                  setidProyecto(proyect.proyecto.id);
                }}
                key={id}
                className="my-3 grid h-[5rem] cursor-pointer grid-cols-2 items-center justify-between rounded-lg bg-gray-100 p-2 hover:bg-gray-200 sm:grid-cols-3 md:grid-cols-4"
              >
                <div className="flex">
                  <div className="pl-4">
                    <p className="text-sm text-gray-800">
                      {proyect.proyecto.nombre}
                    </p>
                  </div>
                </div>
                <p className="hidden md:flex">{proyect.proyecto.estatus}</p>
                <p className="hidden md:flex">
                  {proyect.proyecto.descripcion.slice(0, 75) + "..."}
                </p>
                <div className="m-auto h-2 w-[10rem] rounded-lg bg-green-400">
                  <div className="h-full w-[8rem] rounded-lg bg-green-700"></div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div
        className={
          toggleState === 2 ? "m-auto mt-20 w-[75rem] p-10" : "tab-content"
        }
      >
        <div className="m-auto w-full overflow-y-auto rounded-lg border bg-white p-4">
          <button className="scale-[2]">
            <RiArrowLeftCircleFill onClick={() => toggleTab(1, 0)} />
          </button>
          <div className="my-3 grid cursor-pointer grid-cols-2 items-center justify-between p-2 sm:grid-cols-3 md:grid-cols-4">
            <span>Role</span>
            <span className="text-right sm:text-left">Reviewed By:</span>
            <span className="hidden md:grid">Applied</span>
            <span className="hidden sm:grid">Status</span>
          </div>
          <ul>
            {applicant_data.map((application, id) => (
              <li
                onClick={() => toggleTab(3, id)}
                key={id}
                className="my-3 grid h-[5rem] cursor-pointer grid-cols-2 items-center justify-between rounded-lg bg-gray-100 p-2 hover:bg-gray-200 sm:grid-cols-3 md:grid-cols-4"
              >
                <div className="flex">
                  <div className="pl-4">
                    <p className="text-sm text-gray-800">{application.title}</p>
                  </div>
                </div>
                <p className="hidden md:flex">Under Construction</p>
                <p className="hidden md:flex">{application.date}</p>
                <p className="text-right text-gray-600 sm:text-left">
                  <span
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
                    {application.status}
                  </span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div
        className={
          toggleState === 1 ? "m-auto mt-20 w-[75rem] p-10" : "tab-content"
        }
      >
        <div className="m-auto w-full overflow-y-auto rounded-lg border bg-white p-4">
          <button className="scale-[2]">
            <RiArrowLeftCircleFill onClick={() => toggleTab(0, 0)} />
          </button>
          <div className="my-3 grid cursor-pointer grid-cols-2 items-center justify-between p-2 sm:grid-cols-3 md:grid-cols-4">
            <span>Role</span>
          </div>
          <ul>
            {puestos?.puesto.map((position, id) => (
              <li
                onClick={() => toggleTab(2, id)}
                key={id}
                className="my-3 grid h-[5rem] cursor-pointer grid-cols-2 items-center justify-between rounded-lg bg-gray-100 p-2 hover:bg-gray-200 sm:grid-cols-3 md:grid-cols-4"
              >
                <div className="flex">
                  <div className="pl-4">
                    <p className="text-sm text-gray-800">{position.jobTitle}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div
        className={
          toggleState === 3 ? "m-auto mt-20 w-[75rem] p-10" : "tab-content"
        }
      >
        <div className="m-auto my-3 w-full rounded-lg border bg-white p-4">
          <button className="scale-[2]">
            <RiArrowLeftCircleFill onClick={() => toggleTab(2, 0)} />
          </button>
          <div className="align-center m-3 flex h-[10rem] w-[10rem] items-center justify-center rounded-md bg-gray-200">
            <RiUser3Fill className="scale-[3]" />
          </div>
          <h1 className="m-3 text-2xl">Information</h1>
          <div className="m-3 flex flex-col gap-2 rounded-md bg-gray-200 p-2 shadow-md">
            <h1>name: {application_individual[toggleState2]?.name}</h1>
            <p>position: {application_individual[toggleState2]?.title}</p>
            <p>
              description: {application_individual[toggleState2]?.description}
            </p>
          </div>

          <h1 className="m-3 text-2xl">Status</h1>
          <div className="m-3 w-[12rem] rounded-lg bg-yellow-400 p-3 shadow-md">
            {" "}
            Under Construction
          </div>

          <div className="h-[5rem]"></div>
        </div>
      </div>
    </Layout>
  );
};

export default Projects;
