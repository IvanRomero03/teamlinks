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
import { applicant_data } from "y/components/recruiter/data/applicant_data.js";
import { application_individual } from "y/components/applicant.js";
import { Unity, useUnityContext } from "react-unity-webgl";

const Applications: NextPage = () => {
  const [toggleState, setToggleState] = useState(0);

  const [toggleState2, setToggleState2] = useState(0);

  const toggleTab = (index: number, targetUser: number) => {
    setToggleState(index);
    setToggleState2(targetUser);
  };

  const { unityProvider, sendMessage } = useUnityContext({
    //This build is for the final version
    loaderUrl: "/build/build.loader.js",
    dataUrl: "/build/build.data",
    frameworkUrl: "/build/build.framework.js",
    codeUrl: "/build/build.wasm",
  });

  console.log("Declaring JSON string...");
  //Contains sample test string
  const jsonString = JSON.stringify([{id: "clgy49yb60001c6kkgrk9ixda",position_similarity: "0.77805828797743",proyect_similarity: "0.771634949928021",recruiter_similarity: "0.806145025758184",similarity: "0.785279421221212",name: "Ivan Romero" }, {id: "clgy8a8dl000kml09htwfuy1g",position_similarity: "0.672263908238413",proyect_similarity: "0.696172513813664",recruiter_similarity: "0.712509417473871",similarity: "0.693648613175316",name: "Santiago Gamez"}]);
  console.log("JSON string declared!");
  console.log("JSON string (React): " + jsonString);


    function sendJSONstring() {
    sendMessage("GameManager", "ReceiveJsonString", jsonString);
    console.log("JSON string sent!")
  }

  console.log("Sending JSON string...");
  sendJSONstring();

  console.log("Loading Unity Build...");

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
          <div style={{
                display: "flex",
                justifyContent: "center",}}>
              <Unity style={{
                width: "100%",
                height: "100%", 
                justifyContent: "center",}}
              unityProvider={unityProvider}/>
            </div>
          <ul>
            {applicant_data.map((application, id) => (
              <li
                onClick={() => toggleTab(1, id)}
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
        <div className="m-auto my-3 w-full rounded-lg border bg-white p-4">
          <button className="scale-[2]">
            <RiArrowLeftCircleFill onClick={() => toggleTab(0, 0)} />
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

export default Applications;
