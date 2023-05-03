import Layout from "y/components/layout/layout";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { GetServerSideProps, NextPage } from "next";
import { getServerAuthSession, getServerIsAdmin } from "y/server/auth";
import { api } from "y/utils/api";
import { Puestos } from "@prisma/client";
import RequirementsComponent from "y/components/admin/RequirementsComponent";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const isAdmin = await getServerIsAdmin(ctx);
  const session = await getServerAuthSession(ctx);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  if (!isAdmin) {
    // bad user type
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
    },
  };
};

const ProjectPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, error, isLoading, isError } =
    api.admin.positions.getPositions.useQuery({
      proyectId: id as string,
    });

  const addToContextMutation = api.context.addPosition.useMutation();

  useEffect(() => {
    addToContextMutation.mutate({
      id: id as string,
    });
  }, []);

  return (
    <Layout
      Items={[
        { title: "Home", section: "manager" },
        { title: "Projects", section: "manager/projects" },
        { title: "My Team", section: "manager/team" },
      ]}
    >
      <div className="mt-16 flex min-w-full justify-center">
        {isLoading ? (
          <div>Loading...</div>
        ) : isError ? (
          <div>
            <p className="text-white">Error: {JSON.stringify(error)}</p>
          </div>
        ) : (
          data && (
            <>
              <div className="w-2/4 rounded-lg p-10 shadow-lg">
                <div className="flex items-center justify-between align-middle">
                  <h1 className="mb-6 text-3xl font-bold text-white">
                    {data.jobTitle}
                  </h1>
                  <button
                    className="rounded-md bg-emerald-400 p-2"
                    onClick={() => {
                      void router.push(
                        `/admin/edit/position/${String(data.id)}`
                      );
                    }}
                  >
                    Edit
                  </button>
                </div>
                <div className="flex flex-col">
                  <div className="flex flex-row align-middle">
                    <p className="text-xl font-bold text-white">
                      Creation Date: {String(data.fechaCreacion)}
                    </p>
                    <div
                      className={`${
                        data.estatus === "Open"
                          ? "bg-emerald-400"
                          : "bg-red-400"
                      } m-4 rounded-md p-2 `}
                    >
                      <p className="text-center align-middle text-xl font-bold text-white">
                        {data.estatus}
                      </p>
                    </div>
                    <div
                      className={`${
                        data.tipo === "Onsite" ? "bg-blue-400" : "bg-violet-400"
                      } m-4 rounded-md p-2 `}
                    >
                      <p className="min-w-fit text-xl font-bold text-white">
                        {data.tipo}
                      </p>
                    </div>
                  </div>
                  <div className="my-4">
                    <h3 className="my-2 truncate text-xl font-bold text-white">
                      Description:
                    </h3>
                    <p className="text-md max-h-48 overflow-y-auto rounded-lg bg-slate-600 font-bold text-white">
                      {data.descripcion.split("\n").map((str) => (
                        <>
                          <p>{str}</p>
                          <br />
                        </>
                      ))}
                    </p>
                  </div>
                  <div className="my-4">
                    <h3 className="my-2 truncate text-xl font-bold text-white">
                      Requirements:
                    </h3>
                    <div className="flex flex-wrap">
                      {data.mustHaves.map((req) => (
                        <div
                          className="m-2 rounded-md bg-emerald-400 p-2"
                          key={req.id}
                        >
                          <p className="text-md font-bold text-white">
                            {req.name}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )
        )}
      </div>
    </Layout>
  );
};

export default ProjectPage;
