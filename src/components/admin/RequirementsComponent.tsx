import { useState } from "react";
import { Formik, Form, Field } from "formik";
import { Requirement } from "@prisma/client";

const RequirementsComponent = ({
  requirements,
  proyectoId,
}: {
  requirements: Requirement[];
  proyectoId: string;
}) => {
  const [isEditing, setEditing] = useState(false);
  const [data, setData] = useState(requirements);
  const handleSave = () => {
    setEditing(false);
    // update requirements
  };
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between">
        <h3 className="my-2 text-xl font-bold text-white">Requirements:</h3>
        {isEditing ? (
          <button className={"rounded-md bg-blue-400 p-2"} onClick={handleSave}>
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
          {data.map((req, index) => (
            <div
              className={`${
                index % 2 === 0 ? "bg-blue-400" : "bg-violet-400"
              } m-4 rounded-md p-2`}
              key={req.id}
            >
              <p className="text-xl font-bold text-white">{req.name}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="my-4">
          {data.map((req, index: number) => (
            <div
              className={`${
                index % 2 === 0 ? "bg-blue-400" : "bg-violet-400"
              } items-centers m-4 flex flex-row justify-between rounded-md p-2 text-center align-middle`}
              key={req.id}
            >
              <p className="text-xl font-bold text-white">{req.name}</p>
              <button
                className="rounded-md bg-red-500 p-2"
                onClick={() => {
                  setData(data.filter((r) => r.id !== req.id));
                }}
              >
                Delete
              </button>
            </div>
          ))}
          <h3 className="my-2 text-xl font-bold text-white">
            Add a Requirement:
          </h3>
          <Formik
            initialValues={{
              requirement: "",
            }}
            onSubmit={(values) => {
              const idRequirement = values.requirement;
              setData([
                ...data,
                {
                  proyectoId: proyectoId,
                  id: idRequirement,
                  name: idRequirement,
                },
              ]);
            }}
          >
            {({ values, handleChange, handleSubmit }) => (
              <Form>
                <div className="flex flex-row">
                  <Field
                    as="input"
                    name="requirement"
                    id="requirement"
                    className="rounded-md p-2"
                    placeholder="Add a Requirement"
                    required
                  />
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

export default RequirementsComponent;
