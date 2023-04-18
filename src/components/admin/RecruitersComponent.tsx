import { Reclutador } from "@prisma/client";
import { useState } from "react";
import { api } from "y/utils/api";
import { Formik, Form, Field } from "formik";

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
        {isEditing ? (
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
        )}
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

export default ReacruitersComponent;
