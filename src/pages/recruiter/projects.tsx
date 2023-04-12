import { type NextPage } from "next";
import { PieChart, Pie, ResponsiveContainer, Cell, Label } from "recharts";
import { useState } from "react";
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

interface Project {
  id: string;
  name: string;
  description: string;
}

const projectData: any[] = [
  { id: "001", name: "perfil 1", description: "mock perfil 1" },
  { id: "002", name: "perfil 2", description: "mock perfil 2" },
  { id: "003", name: "perfil 3", description: "mock perfil 3" },
  { id: "004", name: "perfil 4", description: "mock perfil 4" },
];

const mockTeamData: Project[] = [
  { id: "001", name: "proyecto 1", description: "mock equipo 1" },
  { id: "002", name: "proyecto 2", description: "mock equipo 2" },
  { id: "003", name: "proyecto 3", description: "mock equipo 3" },
  { id: "004", name: "proyecto 4", description: "mock equipo 4" },
];

const Projects: NextPage = () => {
  const [toggleState, setToggleState] = useState(0);

  const toggleTab = (index: number) => {
    setToggleState(index);
  };
  const teamData = mockTeamData.map((data) => (
    <div
      className="flex h-[10rem] w-full shrink-0 flex-row gap-1 bg-gray-300 transition-all hover:scale-[1.02]"
      key={data.id}
    >
      <div className="h-full w-[10rem] border-r">
        <div className="m-auto flex h-full w-[3rem] align-middle text-white">
          <RiFile3Fill className="m-auto scale-[4.0]" />
        </div>
      </div>

      <button
        onClick={() => toggleTab(1)}
        className="flex w-full flex-col gap-2 p-2 text-left"
      >
        <div>
          <h1 className="text-xl text-gray-500">{data.name}</h1>
        </div>
        <div>
          <p>{data.description}</p>
        </div>
        <div className="h-[2rem]"></div>
      </button>
    </div>
  ));

  const projectdata = projectData.map((data) => (
    <div
      className="flex h-[10rem] w-full shrink-0 flex-row gap-1 bg-gray-300 transition-all hover:scale-[1.02]"
      key={data.id}
    >
      <div className="h-full w-[10rem] border-r">
        <div className="m-auto flex h-full w-[3rem] align-middle text-white">
          <RiFile3Fill className="m-auto scale-[4.0]" />
        </div>
      </div>

      <button
        className="flex w-full flex-col gap-2 p-2 text-left "
        onClick={() => toggleTab(2)}
      >
        <div>
          <h1 className="text-xl text-gray-500">{data.name}</h1>
        </div>
        <div>
          <p>{data.description}</p>
        </div>
        <div className="h-[2rem]"></div>
      </button>
    </div>
  ));

  return (
    <Layout
      Items={[
        { title: "Home", section: "recruiter" },
        { title: "My User", section: "recruiter/user" },
        { title: "My Projects", section: "recruiter/projects" },
        { title: "Applications", section: "recruiter/applications" },
      ]}
    >
      <div className="mt-32 flex min-w-full flex-row justify-center gap-1">
        <div
          className={
            toggleState === 0
              ? "active-content my-10 h-[38rem] w-[62rem] rounded-lg bg-gray-100"
              : "tab-content"
          }
        >
          <button className="flex h-14 items-center border-b">
            <div className="align-center ml-3 flex h-8 w-8 rounded-lg bg-gray-200">
              <RiSearchLine className="m-auto scale-[1.3]" />
            </div>
            <input type="text" className="m-3 rounded-lg p-1" size={50} />
            <button className="left-0 m-3 p-3" onClick={() => toggleTab(0)}>
              <RiArrowLeftCircleFill className="scale-[1.5]" />
            </button>
          </button>

          <div className="flex h-[32rem] flex-col gap-2 overflow-hidden overflow-y-scroll p-5">
            {teamData}
          </div>
        </div>

        <div
          className={
            toggleState === 2
              ? "active-content m-10 h-[38rem] w-[62rem] rounded-lg bg-gray-100"
              : "tab-content"
          }
        >
          <div className="items-left flex">
            <button className="left-0 m-3 p-3" onClick={() => toggleTab(0)}>
              <RiArrowLeftCircleFill className="scale-[1.5]" />
            </button>
          </div>
          <div className="flex h-[32rem] flex-col gap-2 overflow-hidden overflow-y-scroll p-5">
            <h1>Perfil</h1>
            <p>perfil data</p>
          </div>
        </div>

        <div
          className={
            toggleState === 1
              ? "active-content my-10 h-[38rem] w-[62rem] rounded-lg bg-gray-100"
              : "tab-content"
          }
        >
          <button className="flex h-14 items-center border-b">
            <div className="align-center ml-3 flex h-8 w-8 rounded-lg bg-gray-200">
              <RiSearchLine className="m-auto scale-[1.3]" />
            </div>
            <input type="text" className="m-3 rounded-lg p-1" size={50} />
            <button className="left-0 m-3 p-3" onClick={() => toggleTab(1)}>
              <RiArrowLeftCircleFill className="scale-[1.5]" />
            </button>
          </button>

          <div className="flex h-[32rem] flex-col gap-2 overflow-hidden overflow-y-scroll p-5">
            {projectdata}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Projects;
