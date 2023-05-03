import { type NextPage } from "next";
import Layout from "y/components/layout/layout";
import { getServerAuthSession, getServerIsAdmin } from "y/server/auth";
import { type GetServerSideProps } from "next";
import { api } from "y/utils/api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  Reclutador,
  ReclutadorProyectos,
  Requirement,
  Puestos,
} from "@prisma/client";
import { Field, Form, Formik } from "formik";
import Modal from "y/components/modal";
import PositionItem from "y/components/admin/PositionItem";
import RequirementsComponent from "y/components/admin/RequirementsComponent";
import ReacruitersComponent from "y/components/admin/RecruitersComponent";
import { toast } from "react-toastify";

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

  const { data, isError, isLoading, error } =
    api.admin.projectRouter.getProyect.useQuery({
      id: id as string,
    });

  const add_to_context = api.context.addProject.useMutation();

  useEffect(() => {
    if (data && id) {
      add_to_context.mutate({ id: id as string });
    }
  }, [data]);

  const mutation = api.admin.positions.createPosition.useMutation();
  const contextMutation = api.context.addPosition.useMutation();

  const [puestoTypeTemp, setPuestoTypeTemp] = useState<Puestos>();

  const [showModal, setShowModal] = useState(false);

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
                    {data.nombre}
                  </h1>
                  <button
                    className="rounded-md bg-emerald-400 p-2"
                    onClick={() => {
                      void router.push(`/manager/edit/project/${String(id)}`);
                    }}
                  >
                    Edit
                  </button>
                </div>
                <div className="flex flex-col">
                  <div className="flex flex-row">
                    <p className="text-xl font-bold text-white">
                      Creation Date: {String(data.fechaCreacion)}
                    </p>
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
                  <div className="my-4">
                    <h3 className="my-2 text-xl font-bold text-white">
                      Descripcion:
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
                  <RequirementsComponent
                    requirements={data.Requirement}
                    proyectoId={data.id}
                  />
                  <ReacruitersComponent recruiters={data.ReclutadorProyectos} />
                  {/** Positions */}
                  <div className="my-4">
                    <div className="flex flex-row justify-between">
                      <h3 className="my-2 text-xl font-bold text-white">
                        Positions:
                      </h3>
                      <button
                        className="rounded-md bg-emerald-400 p-2"
                        onClick={() => {
                          setShowModal(true);
                        }}
                      >
                        Add Position
                      </button>
                    </div>
                    <div className="flex flex-col">
                      {data.puesto.map((puesto) => (
                        <PositionItem key={puesto.id} position={puesto} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )
        )}
      </div>
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      >
        <div className=" flex min-w-full flex-col space-y-2">
          <h1 className="text-3xl font-bold ">Add Position</h1>
          <Formik
            initialValues={{
              jobTitle: "",
              description: "",
              estatus: "Open",
              numPosiciones: 0,
              numPosicionesDisponibles: 0,
              tipo: "Full Time",
              hireCategory: "",
              Requirements: [],
              _req: "",
              Genus: "New Grad",
            }}
            onSubmit={async (values, { resetForm, setSubmitting }) => {
              console.log(values);
              setSubmitting(true);
              const res = await mutation.mutateAsync({
                jobTitle: values.jobTitle,
                description: values.description,
                estatus: values.estatus,
                numPosiciones: values.numPosiciones,
                numPosicionesDisponibles: values.numPosicionesDisponibles,
                tipo: values.tipo,
                hireCategory: values.hireCategory,
                Requirements: values.Requirements,
                Genus: values.Genus,
                proyectId: id as string,
              });
              setSubmitting(false);
              if (res) {
                resetForm();
                setShowModal(false);
                toast.success("Added!", {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                });
                contextMutation.mutate({
                  id: res.id,
                });
              } else {
                console.log("Error");
                alert("Error");
              }
            }}
          >
            {({ values, setFieldValue }) => (
              <Form>
                <div className="w-full max-w-full">
                  <div className="flex max-h-[30rem] flex-col space-y-2 overflow-y-auto">
                    <div className="flex flex-col space-y-2">
                      <label htmlFor="jobTitle" className="text-xl ">
                        Job Title
                      </label>
                      <Field
                        id="jobTitle"
                        name="jobTitle"
                        placeholder="Job Title"
                        as="input"
                        className="rounded-md border-2 border-blue-200 p-2 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="description">Description</label>
                      <Field
                        id="description"
                        name="description"
                        placeholder="Description"
                        as="textarea"
                        className="min-h-24 h-24 rounded-md border-2 border-blue-200 p-2 focus:border-blue-500 "
                        required
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="estatus">Status</label>
                      <Field
                        id="estatus"
                        name="estatus"
                        placeholder="Estatus"
                        as="select"
                        className="rounded-md border-2 border-blue-200 p-2 focus:border-blue-500"
                        required
                      >
                        <option value="Open">Open</option>
                        <option value="Closed">Closed</option>
                      </Field>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex flex-row ">
                        <div className="flex w-1/2 flex-col">
                          <label htmlFor="numPosiciones">
                            Number of Positions
                          </label>
                          <Field
                            id="numPosiciones"
                            name="numPosiciones"
                            placeholder="Number of Positions"
                            as="input"
                            type="number"
                            className="rounded-md border-2 border-blue-200 p-2 focus:border-blue-500"
                            min={0}
                            required
                          />
                        </div>
                        <div className="flex w-1/2 flex-col">
                          <label htmlFor="numPosicionesDisponibles">
                            Number of Available Positions
                          </label>
                          <Field
                            id="numPosicionesDisponibles"
                            name="numPosicionesDisponibles"
                            placeholder="Number of Available Positions"
                            as="input"
                            type="number"
                            min={0}
                            max={values.numPosiciones}
                            className="rounded-md border-2 border-blue-200 p-2 focus:border-blue-500"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="tipo">Type</label>
                      <Field
                        id="tipo"
                        name="tipo"
                        placeholder="Type"
                        as="select"
                        className="rounded-md border-2 border-blue-200 p-2 focus:border-blue-500"
                        required
                      >
                        <option value="Full Time">Full Time</option>
                        <option value="Part Time">Part Time</option>
                        <option value="Internship">Internship</option>
                        <option value="Temporary">Temporary</option>
                      </Field>
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="hireCategory">Hire Category</label>
                      <Field
                        id="hireCategory"
                        name="hireCategory"
                        placeholder="Hire Category"
                        as="input"
                        className="rounded-md border-2 border-blue-200 p-2 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="Genus">Genus</label>
                      <Field
                        id="Genus"
                        name="Genus"
                        placeholder="Genus"
                        as="select"
                        className="rounded-md border-2 border-blue-200 p-2 focus:border-blue-500"
                        required
                      >
                        <option value="New Grad">New Grad</option>
                        <option value="Junior">Junior</option>
                        <option value="Mid">Mid</option>
                        <option value="Senior">Senior</option>
                        <option value="Lead">Lead</option>
                      </Field>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex">
                        <div className="flex w-1/2 flex-col">
                          <label htmlFor="Requirements">Requirements</label>
                          <Field
                            id="_req"
                            name="_req"
                            placeholder="Requirements"
                            as="input"
                            className="rounded-md border-2 border-blue-200 p-2 focus:border-blue-500"
                          />
                        </div>
                        <button
                          type="button"
                          className="self-end rounded-md bg-emerald-400 p-2"
                          onClick={() => {
                            setFieldValue("Requirements", [
                              ...values.Requirements,
                              values._req,
                            ]);
                            setFieldValue("_req", "");
                          }}
                        >
                          Add Requirement
                        </button>
                      </div>
                      <div className="m-2 flex flex-wrap ">
                        {values.Requirements.map((req, index) => (
                          <div
                            key={index}
                            className="m-2 flex flex-row items-center space-x-2 rounded-md border-2 border-blue-200 p-2"
                          >
                            <p className="font-bold">{req}</p>
                            <button
                              type="button"
                              className="rounded-md bg-red-400 p-2 text-center align-middle font-bold"
                              onClick={() => {
                                setFieldValue(
                                  "Requirements",
                                  values.Requirements.filter(
                                    (r, i) => i !== index
                                  )
                                );
                              }}
                            >
                              X
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="mt-6 min-w-full rounded-md bg-emerald-400 p-2"
                  >
                    Add Position
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Modal>
    </Layout>
  );
};

export default ProjectPage;
