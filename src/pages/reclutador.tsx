import { type NextPage } from "next";
import Layout from "y/components/layout/layout";
import { useState } from "react";
import { PieChart, Pie, ResponsiveContainer, Cell, Label } from "recharts";
import { VictoryPie } from "victory";
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

// query a base de datos- equipos | database.query(parametros).map(reclutador == user.name)

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const chartData = [
  { x: "Approved", y: 5 },
  { x: "Rejected", y: 5 },
  { x: "Pending", y: 5 },
];

const mockTeamData: Project[] = [
  { id: "001", name: "proyecto 1", description: "mock equipo 1" },
  { id: "002", name: "proyecto 2", description: "mock equipo 2" },
  { id: "003", name: "proyecto 3", description: "mock equipo 3" },
  { id: "004", name: "proyecto 4", description: "mock equipo 4" },
];

const projectData = [
  { id: "001", name: "perfil 1", description: "mock perfil 1" },
  { id: "002", name: "perfil 2", description: "mock perfil 2" },
  { id: "003", name: "perfil 3", description: "mock perfil 3" },
  { id: "004", name: "perfil 4", description: "mock perfil 4" },
];

const MemberInfo = ({ id, name, description }: Project) => {
  return (
    <div
      className="flex h-[10rem] w-full shrink-0 flex-row gap-1 bg-gray-300 transition-all hover:scale-[1.02]"
      key={id}
    >
      <div className="h-full w-[10rem] border-r">
        <div className="m-auto flex h-full w-[3rem] align-middle text-white">
          <RiFile3Fill className="m-auto scale-[4.0]" />
        </div>
      </div>

      <button className="flex w-full flex-col gap-2 p-2 text-left">
        <div>
          <h1 className="text-xl text-gray-500">{name}</h1>
        </div>
        <div>
          <p>{description}</p>
        </div>
        <div className="h-[2rem]"></div>
      </button>
    </div>
  );
};

const Home: NextPage = () => {
  const [toggleState, setToggleState] = useState(0);

  const toggleTab = (index: number) => {
    setToggleState(index);
  };

  //   const teamData = mockTeamData.map((data) => (
  //     <div
  //       className="flex h-[10rem] w-full shrink-0 flex-row gap-1 bg-gray-300 transition-all hover:scale-[1.02]"
  //       key={data.id}
  //     >
  //       <div className="h-full w-[10rem] border-r">
  //         <div className="m-auto flex h-full w-[3rem] align-middle text-white">
  //           <RiFile3Fill className="m-auto scale-[4.0]" />
  //         </div>
  //       </div>

  //       <button
  //         onClick={() => toggleTab(3)}
  //         className="flex w-full flex-col gap-2 p-2 text-left"
  //       >
  //         <div>
  //           <h1 className="text-xl text-gray-500">{data.name}</h1>
  //         </div>
  //         <div>
  //           <p>{data.description}</p>
  //         </div>
  //         <div className="h-[2rem]"></div>
  //       </button>
  //     </div>
  //   )); lmaoooooooooo

  // agarra la lista de project data y crea el UI dinamico
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
        onClick={() => toggleTab(4)}
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
    <>
      <div className="grid-col-1 grid min-h-screen lg:grid-cols-6">
        <div className="top-0 left-0 col-span-1 overflow-y-scroll border-r bg-gray-100 p-8">
          <div className="p-8 text-center">
            <h1 className="font-bold uppercase tracking-[4px]"> Teamlinks </h1>
          </div>

          <nav>
            <ul>
              <li>
                <a
                  onClick={() => toggleTab(0)}
                  href="#"
                  className="flex items-center gap-2 rounded-lg p-8 py-4 px-4 transition-colors hover:bg-blue-500 hover:text-white"
                >
                  My dashboard
                </a>
                <a
                  onClick={() => toggleTab(1)}
                  href="#"
                  className="flex items-center gap-2 rounded-lg p-8 py-4 px-4 transition-colors hover:bg-blue-500 hover:text-white"
                >
                  My user
                </a>
                <a
                  onClick={() => toggleTab(2)}
                  href="#"
                  className="flex items-center gap-2 rounded-lg p-8 py-4 px-4 transition-colors hover:bg-blue-500 hover:text-white"
                >
                  My projects
                </a>
                <a
                  onClick={() => toggleTab(5)}
                  href="#"
                  className="flex items-center gap-2 rounded-lg p-8 py-4 px-4 transition-colors hover:bg-blue-500 hover:text-white"
                >
                  My applications
                </a>
              </li>
            </ul>
          </nav>

          <div className="flex flex-col gap-4">
            <div className="h-80"></div>
            <a
              href="#"
              className="flex items-center gap-2 rounded-lg p-8 py-4 px-4 transition-colors hover:bg-blue-500 hover:text-white"
            >
              <RiLogoutBoxRLine />
              Logout
            </a>
          </div>
        </div>
        <div className="col-span-5">
          <div className="my-20">
            <div
              className={toggleState === 0 ? "active-content" : "tab-content"}
            >
              <div className="flex flex-row gap-1">
                <div className="m-10 h-[32rem] w-96 rounded-lg bg-gray-100 shadow-lg">
                  <h1 className="m-2 text-lg">My metrics</h1>
                  <div className="height-[20rem] m-auto w-[12rem] scale-[1.6]">
                    <VictoryPie
                      data={chartData}
                      colorScale={["#0088FE", "#00C49F", "#FF8042"]}
                      radius={100}
                    />
                  </div>
                  <div className="m-auto my-6 flex w-[22rem] flex-row items-center justify-center gap-2">
                    <div className="rounded-lg bg-gray-200 p-2 shadow-lg">
                      new applications: 5
                    </div>
                    <div className="rounded-lg bg-gray-200 p-2 shadow-lg">
                      total applications: 15
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={toggleState === 1 ? "active-content" : "tab-content"}
            >
              <div className="flex flex-row gap-1">
                <div className="m-10 h-[32rem] w-96 rounded-lg bg-gray-100 shadow-lg">
                  <div className="flex h-40 items-center border-b">
                    <div className="m-auto flex h-20 w-20 items-center rounded-full bg-gray-500">
                      <RiUser3Fill className="m-auto scale-[2] text-white" />
                    </div>
                  </div>
                  <div className="p-5">
                    <h1>user id</h1>
                    <h1>last name, first name</h1>
                    <h1>Position</h1>
                    <h1>Years in Nagarro</h1>
                    <h1>Main Technology: example</h1>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={
                toggleState === 2
                  ? "active-content m-10 h-[38rem] w-[62rem] rounded-lg bg-gray-100"
                  : "tab-content"
              }
            >
              <button className="flex h-14 items-center border-b">
                <div className="align-center ml-3 flex h-8 w-8 rounded-lg bg-gray-200">
                  <RiSearchLine className="m-auto scale-[1.3]" />
                </div>
                <input type="text" className="m-3 rounded-lg p-1" size={50} />
              </button>

              <div className="flex h-[32rem] flex-col gap-2 overflow-hidden overflow-y-scroll p-5">
                {mockTeamData.map((data) => (
                  <MemberInfo
                    key={data.id}
                    id={data.id}
                    name={data.name}
                    description={data.description}
                  />
                ))}
              </div>
            </div>

            <div
              className={
                toggleState === 3
                  ? "active-content my-10 h-[38rem] w-[62rem] rounded-lg bg-gray-100"
                  : "tab-content"
              }
            >
              <button className="flex h-14 items-center border-b">
                <div className="align-center ml-3 flex h-8 w-8 rounded-lg bg-gray-200">
                  <RiSearchLine className="m-auto scale-[1.3]" />
                </div>
                <input type="text" className="m-3 rounded-lg p-1" size={50} />
                <button className="left-0 m-3 p-3" onClick={() => toggleTab(2)}>
                  <RiArrowLeftCircleFill className="scale-[1.5]" />
                </button>
              </button>

              <div className="flex h-[32rem] flex-col gap-2 overflow-hidden overflow-y-scroll p-5">
                {projectdata}
              </div>
            </div>

            <div
              className={
                toggleState === 4
                  ? "active-content m-10 h-[38rem] w-[62rem] rounded-lg bg-gray-100"
                  : "tab-content"
              }
            >
              <div className="items-left flex">
                <button className="left-0 m-3 p-3" onClick={() => toggleTab(3)}>
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
                toggleState === 5
                  ? "active-content m-10 h-[38rem] w-[62rem] rounded-lg bg-gray-100"
                  : "tab-content"
              }
            >
              <button className="flex h-14 items-center border-b">
                <div className="align-center ml-3 flex h-8 w-8 rounded-lg bg-gray-200">
                  <RiSearchLine className="m-auto scale-[1.3]" />
                </div>
                <input type="text" className="m-3 rounded-lg p-1" size={50} />
              </button>

              <div className="flex h-[32rem] flex-col gap-2 overflow-hidden overflow-y-scroll p-5">
                {projectdata}
              </div>
            </div>

            <div
              className={
                toggleState === 6
                  ? "active-content my-20 h-[38rem] w-[62rem] rounded-lg bg-gray-100"
                  : "tab-content"
              }
            >
              <div className="flex h-[32rem] flex-col gap-2 overflow-hidden overflow-y-scroll p-5">
                <h1>Perfil</h1>
                <p>perfil data</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
