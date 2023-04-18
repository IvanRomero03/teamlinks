import { type NextPage } from "next";
import Layout from "y/components/layout/layout";
import { getServerAuthSession, getServerIsAdmin } from "y/server/auth";
import { type GetServerSideProps } from "next";
import { api } from "y/utils/api";
import { useRouter } from "next/router";
import { useState } from "react";
import { Reclutador, ReclutadorProyectos } from "@prisma/client";
import { Field, Form, Formik } from "formik";

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

// Page for the admin to view the specific project, edit it, and assign recruiters to it
const ProjectPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, isError, isLoading } =
    api.admin.projectRouter.getProyect.useQuery({
      id: id as string,
    });

  return (
    <Layout
      Items={[
        { title: "Home", section: "admin" },
        { title: "Projects", section: "admin/projects" },
        { title: "My Team", section: "admin/team" },
      ]}
    >
      <div className="mt-32 flex min-w-full justify-center">
        {isLoading ? (
          <div>Loading...</div>
        ) : isError ? (
          <div>Error</div>
        ) : (
          data && (
            <>
              <div className="w-2/4 rounded-lg p-10 shadow-lg">
                <div className="flex items-center justify-between align-middle">
                  <h1 className="mb-6 text-3xl font-bold text-white">
                    {data.nombre}
                  </h1>
                  <button
                    className="rounded-md bg-emerald-400 p-2"
                    onClick={() => {
                      void router.push(`/admin/edit/project/${String(id)}`);
                    }}
                  >
                    Edit
                  </button>
                </div>
                <div className="flex flex-col">
                  <div className="flex flex-row">
                    {/** Project Creation Date */}
                    <p className="text-xl font-bold text-white">
                      Creation Date: {String(data.fechaCreacion)}
                    </p>
                    {/** Project status and type as a badge */}
                    {/** Status is Open or Closed */}
                    <div
                      className={`${
                        data.estatus === "Abierto"
                          ? "bg-emerald-400"
                          : "bg-red-400"
                      } m-4 rounded-md p-2`}
                    >
                      <p className="text-xl font-bold text-white">
                        {data.estatus}
                      </p>
                    </div>
                    {/** Type is either Onsite or Remote */}
                    <div
                      className={`${
                        data.type === "Onsite" ? "bg-blue-400" : "bg-violet-400"
                      } m-4 rounded-md p-2 `}
                    >
                      <p className="text-xl font-bold text-white">
                        {data.type}
                      </p>
                    </div>
                  </div>
                  {/** Project Description */}
                  <div className="my-4">
                    <h3 className="my-2 text-xl font-bold text-white">
                      Descripcion:
                    </h3>
                    <p className="text-md font-bold text-white">
                      {data.descripcion}
                    </p>
                  </div>
                  {/** Project Requirements */}
                  {data.Requirement.length > 0 && (
                    <div className="my-4">
                      <h3 className="my-2 text-xl font-bold text-white">
                        Requerimientos:
                      </h3>
                      {/** Iterate random colors */}
                      {data.Requirement.map((req, index) => (
                        <div
                          className={`${
                            index % 2 === 0 ? "bg-blue-400" : "bg-violet-400"
                          } m-4 rounded-md p-2`}
                          key={req.id}
                        >
                          <p className="text-xl font-bold text-white">
                            {req.name}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/** Project Recruiters */}
                  <ReacruitersComponent recruiters={data.ReclutadorProyectos} />
                  {/**
                     * data.ReclutadorProyectos
                     * (property) ReclutadorProyectos: {
                            reclutador: Reclutador & {
                                user: {
                                    name: string | null;
                                };
                            };
                        }[]

                        equals to:

                        interface ReclutadorProyectosProps {
                          reclutador: Reclutador & {
                            user: {
                              name: string | null;
                            };
                          };
                        }
                     */}
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

const ReacruitersComponent = ({
  recruiters,
}: {
  recruiters: {
    reclutador: Reclutador & {
      user: {
        name: string | null;
      };
    };
  }[];
}) => {
  const [isEditing, setEditing] = useState(false);
  const [data, setData] = useState(recruiters);
  const { data: allRecruiters } = api.admin.recruiters.getTeam.useQuery();
  const handleSave = () => {
    setEditing(false);
    // new recruiters (the ones that where not on recruiters prop)
    // const newRecruiters = data.filter(
    //   (rec: any) => !recruiters.find((r: any) => r.id === rec.id)
    // );
    // // deleted recruiters (the ones that where on recruiters prop but are not on data)
    // const deletedRecruiters = recruiters.filter(
    //   (rec: any) => !data.find((r: any) => r.id === rec.id)
    // );
    // update recruiters
  };
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between">
        <h3 className="my-2 text-xl font-bold text-white">Recruiters:</h3>
        {
          // If the user is editing, show the save button
          isEditing ? (
            <button
              className="rounded-md bg-emerald-400 p-2"
              onClick={handleSave}
            >
              Save
            </button>
          ) : (
            <button
              className="rounded-md bg-emerald-400 p-2"
              onClick={() => setEditing(true)}
            >
              Edit
            </button>
          )
        }
      </div>
      {!isEditing ? (
        <div className="my-4">
          {data.map((rec, index) => (
            <div
              className={`${
                index % 2 === 0 ? "bg-blue-400" : "bg-violet-400"
              } m-4 rounded-md p-2`}
              key={rec.reclutador.id}
            >
              <p className="text-xl font-bold text-white">
                {rec.reclutador.user.name}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="my-4">
          {data.map((rec, index: number) => (
            <div
              className={`${
                index % 2 === 0 ? "bg-blue-400" : "bg-violet-400"
              } items-centers m-4 flex flex-row justify-between rounded-md p-2 text-center align-middle`}
              key={rec.reclutador.id}
            >
              <p className="text-xl font-bold text-white">
                {rec.reclutador.user.name}
              </p>

              {/* Delete From list */}
              <button
                className="rounded-md bg-red-500 p-2"
                onClick={() => {
                  setData(
                    data.filter((r) => r.reclutador.id !== rec.reclutador.id)
                  );
                }}
              >
                Delete
              </button>
            </div>
          ))}

          {/* Add to list */}
          <h3 className="my-2 text-xl font-bold text-white">
            Add a Recruiter:
          </h3>
          <Formik
            initialValues={{
              recruiter:
                (allRecruiters?.length &&
                  allRecruiters?.length > 0 &&
                  allRecruiters[0]?.id) ||
                "",
            }}
            onSubmit={(values) => {
              const idRecruiter = values.recruiter;
              const recruiter = allRecruiters?.find(
                (rec) => rec.id === idRecruiter
              );
              setData([
                ...data,
                {
                  reclutador: {
                    id: recruiter?.id as string,
                    adminId: recruiter?.adminId as string,
                    country: recruiter?.country as string,
                    departamentoId: recruiter?.departamentoId as string,
                    tecPrincipal: recruiter?.tecPrincipal as string,
                    tecSecundaria: recruiter?.tecSecundaria as string,
                    user: {
                      name: String(recruiter?.user.name),
                    },
                  },
                },
              ]);
            }}
          >
            {({ values, handleChange, handleSubmit }) => (
              <Form>
                <div className="flex flex-row">
                  <Field
                    as="select"
                    name="recruiter"
                    id="recruiter"
                    className="rounded-md p-2"
                    placeholder="Add a Recruiter"
                    required
                  >
                    {allRecruiters?.map((rec) => (
                      <option value={rec.id} key={rec.id}>
                        {rec.user.name}
                      </option>
                    ))}
                  </Field>
                  <button
                    className="rounded-md bg-emerald-400 p-2"
                    type="submit"
                  >
                    Add
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
};
