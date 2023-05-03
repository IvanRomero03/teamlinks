"use client";
import {
  InferGetStaticPropsType,
  type GetServerSideProps,
  type NextPage,
} from "next";
import Layout from "y/components/layout/layout";

import { api } from "y/utils/api";
import { getServerAuthSession } from "y/server/auth";
import { Unity, useUnityContext } from "react-unity-webgl";
import { useEffect } from "react";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  console.log(ctx.query);
  // query: { idPosition: position.id, idProyect: idProyecto },
  const session = await getServerAuthSession(ctx);
  if (!ctx.query) {
    return {
      redirect: {
        destination: "/recruiter/projects",
        permanent: false,
      },
    };
  }
  const idPosition = ctx.query.idPosition;
  const idProyect = ctx.query.idProyect;
  //const { idPosition, idProyect } = ctx.query;

  if (!idPosition || !idProyect) {
    return {
      redirect: {
        destination: "/recruiter/projects",
        permanent: false,
      },
    };
  }
  return {
    props: {
      idPosition: idPosition as string,
      idProyect: idProyect as string,
    },
  };
};

const Projects = ({
  idPosition,
  idProyect,
}: {
  idPosition: string;
  idProyect: string;
}) => {
  const { data: positions, isLoading: positionsLoading } =
    api.position.getPosition.useQuery({ id: idPosition });
  const {
    data: matches,
    isLoading: matchesLoading,
    isFetched,
  } = api.context.getMatches.useQuery({
    min_similarity: 0,
    positionId: idPosition,
    proyectId: idProyect,
  });

  const { unityProvider, sendMessage, isLoaded } = useUnityContext({
    //This build is for the final version
    loaderUrl: "/build/build.loader.js",
    dataUrl: "/build/build.data",
    frameworkUrl: "/build/build.framework.js",
    codeUrl: "/build/build.wasm",
  });

  const sendJSONstring = () => {
    const jsonString = JSON.stringify(matches);
    console.log(jsonString);
    sendMessage("GameManager", "ReceiveJsonString", jsonString);
  };

  useEffect(() => {
    if (isFetched && matches && isLoaded) {
      console.log("sending matches");
      sendJSONstring();
    }
  }, [isFetched, matches, isLoaded]);

  return (
    <Layout
      Items={[
        { title: "Home", section: "recruiter" },
        { title: "My User", section: "recruiter/user" },
        { title: "My Projects", section: "recruiter/projects" },
        { title: "Applications", section: "recruiter/applications" },
      ]}
    >
      <div className="m-auto mt-20 p-10">
        {positionsLoading ? (
          <p className="text-2xl font-bold text-white">Loading</p>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-white">
              {positions?.jobTitle}
            </h1>
            <p className="text-md my-4 h-32 overflow-auto font-bold text-white">
              {positions?.descripcion}
            </p>
            <div className="flex flex-col justify-center border-2 border-gray-300 bg-white p-4 shadow-lg">
              {positions?.Aplicacion.map((aplicacion) => (
                <div
                  className="flex flex-row justify-between"
                  key={aplicacion.id}
                >
                  <p>{aplicacion.candidato.user.name}</p>
                  <p>{aplicacion.estatus}</p>
                </div>
              ))}
            </div>
            {matchesLoading ? (
              <p className="text-2xl font-bold">Loading</p>
            ) : (
              <>
                <h1 className="text-2xl font-bold text-white">Matches</h1>
              </>
            )}
          </>
        )}
        <div className="flex flex-col justify-center border-2 border-gray-300 bg-white p-4 shadow-lg">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Unity
              style={{
                width: "100%",
                height: "100%",
                justifyContent: "center",
              }}
              unityProvider={unityProvider}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Projects;
