import { type NextPage } from "next";
import Layout from "y/components/layout/layout";
import {
  RiHome2Fill,
  RiLogoutBoxRLine,
  RiSettings2Fill,
  RiInformationFill,
  RiUser3Fill,
  RiSearchLine,
  RiTeamFill,
  RiFile2Fill,
  RiFile3Fill,
  RiArrowLeftCircleFill,
} from "react-icons/ri";
import { useState } from "react";
import { api } from "y/utils/api";

//import Unity, { UnityContext } from "react-unity-webgl";

const Applications: NextPage = () => {
  const [toggleState, setToggleState] = useState(0);

  const [toggleState2, setToggleState2] = useState(0);

  const toggleTab = (index: number, targetUser: number) => {
    setToggleState(index);
    setToggleState2(targetUser);
  };

  const { data, error } =
    api.recruiterInfo.application.getApplication.useQuery();

  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

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
            <span>Role</span>
            <span className="text-right sm:text-left">Reviewed By:</span>
            <span className="hidden md:grid">Applied</span>
            <span className="hidden sm:grid">Status</span>
          </div>
          <ul>
            {data?.map((application, id) => (
              <li
                onClick={() => toggleTab(1, id)}
                key={id}
                className="my-3 grid h-[5rem] cursor-pointer grid-cols-2 items-center justify-between rounded-lg bg-gray-100 p-2 hover:bg-gray-200 sm:grid-cols-3 md:grid-cols-4"
              >
                <div className="flex">
                  <div className="pl-4">
                    <p className="text-sm text-gray-800">
                      {application.Puestos?.jobTitle}
                    </p>
                  </div>
                </div>
                <p className="hidden md:flex">Under Construction</p>
                <p className="hidden md:flex">
                  {String(application.fechaCreacion.getDate()) +
                    "/" +
                    String(month[application.fechaCreacion.getMonth()]) +
                    "/" +
                    String(application.fechaCreacion.getFullYear())}
                </p>
                <p className="text-right text-gray-600 sm:text-left">
                  <span
                    className={
                      application.estatus === "Not Selected"
                        ? "w-fit rounded-lg bg-red-400 p-1"
                        : application.estatus === "Selected"
                        ? "w-fit rounded-lg bg-green-400 p-1"
                        : application.estatus === "Under Consideration"
                        ? "w-fit rounded-lg bg-yellow-400 p-1"
                        : application.estatus === "Applied"
                        ? "w-fit rounded-lg bg-blue-400 p-1"
                        : "invisible h-0"
                    }
                  >
                    {application.estatus}
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
        {data?.map((application, id) => (
          <div
            key={id}
            className="m-auto my-3 w-full rounded-lg border bg-white p-4"
          >
            <button className="scale-[2]">
              <RiArrowLeftCircleFill onClick={() => toggleTab(0, 0)} />
            </button>
            <div className="align-center m-3 flex h-[10rem] w-[10rem] items-center justify-center rounded-md bg-gray-200">
              <RiUser3Fill className="scale-[3]" />
            </div>
            <h1 className="m-3 text-2xl">Information</h1>
            <div className="m-3 flex flex-col gap-2 rounded-md bg-gray-200 p-2 shadow-md">
              <h1>Name: {application.candidato.user.name}</h1>
              <p>Position: {application.candidato.description}</p>
              <p>Skills: </p>
              <div className="flex">
                {application.candidato.CandiadateTechStack.map((skill) => (
                  <div
                    key={skill.id}
                    className="sh mx-1 w-fit rounded-lg bg-gray-400 p-2"
                  >
                    <p>{skill.name}</p>
                  </div>
                ))}
              </div>
              <p>Experience:</p>
              {application.candidato.CandidateExpirience.map((experience) => (
                <div
                  key={experience.id}
                  className="flex w-fit flex-col gap-2 rounded-md bg-gray-400 p-2 shadow-md"
                >
                  <h1 className="font-bold">{experience.description}</h1>
                  <p className="text-sm">Company: {experience.employer}</p>
                  <p className="text-sm">Since: {experience.startDate}</p>
                </div>
              ))}
            </div>

            <h1 className="m-3 text-2xl">Status</h1>
            <div className="m-3 w-[12rem] rounded-lg bg-yellow-400 p-3 shadow-md">
              {" "}
              Under Construction
            </div>

            <div className="h-[5rem]"></div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Applications;
