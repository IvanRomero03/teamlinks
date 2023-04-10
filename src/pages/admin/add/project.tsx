import Layout from "y/components/layout/layout";
import { getServerAuthSession, getServerIsAdmin } from "y/server/auth";
import { NextPage, type GetServerSideProps } from "next";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { api } from "y/utils/api";
import { useSession } from "next-auth/react";

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

// Page for the admin to add new Recruiters
const RecruiterForm: NextPage = () => {
  return (
    <Layout
      Items={[
        { title: "Home", section: "admin" },
        { title: "Projects", section: "admin/projects" },
        { title: "My Team", section: "admin/team" },
      ]}
    >
      {/** Add new Recruiter form */}
      <div className="mt-32 flex min-w-full justify-center">
        {/** White BG on center */}
        <div className="w-3/4 rounded-lg bg-white p-10 shadow-lg">
          <h1 className="mb-6 text-3xl font-bold">Create New Project</h1>
          <FormikForm />
        </div>
      </div>
    </Layout>
  );
};

export default RecruiterForm;

const FormikForm = () => {
  const session = useSession();
  //const mutate = api.admin.inviteRecruiter.inviteRecruiter.useMutation();
  return (
    <Formik
      initialValues={{
        name: "",
        description: "",
        country: "",
        type: "",
        status: "",
        requirements: [],
        _req: "",
      }}
      validate={(values) => {
        const errors = {};
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          if (session.status === "authenticated") {
            // call the protected procedure inviteRecruiter
            console.log("aqui");
            // mutate.mutate({
            //   email: values.email,
            // });
            // const mutateInfo = mutate.data;
            // console.log(mutateInfo);
            console.log("mutate");
          }
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isSubmitting, values, setFieldValue }) => (
        <Form className="space-y-2">
          <p className="text-lg font-bold">Project Name</p>
          <Field
            type="text"
            name="name"
            required
            className="min-w-full rounded-lg border-2 border-blue-300"
          />
          <ErrorMessage name="name" component="div" />
          {/** Description */}
          <p className="text-lg font-bold">Description</p>
          {/** Description Text area */}
          <Field
            as="textarea"
            name="description"
            required
            className="min-w-full rounded-lg border-2 border-blue-300"
          />
          <ErrorMessage name="description" component="div" />
          {/** Country dropdown select */}
          <p className="text-lg font-bold">Country</p>
          <div className="flex flex-col">
            <Field
              as="select"
              name="country"
              required
              className="min-w-full rounded-lg border-2 border-blue-300"
            >
              <option value="Mexico">Mexico</option>
              <option value="USA">USA</option>
              <option value="Canada">Canada</option>
            </Field>
          </div>
          <ErrorMessage name="country" component="div" />
          {/** Type dropdown select */}
          <p className="text-lg font-bold">Type</p>
          <div className="flex flex-col">
            <Field
              as="select"
              name="type"
              required
              className="min-w-full rounded-lg border-2 border-blue-300"
            >
              <option value="Onsite">Onsite</option>
              <option value="Remote">Remote</option>
            </Field>
          </div>

          <ErrorMessage name="type" component="div" />
          {/** Status dropdown select */}
          <p className="text-lg font-bold">Status</p>
          <div className="flex flex-col">
            <Field
              as="select"
              name="status"
              required
              className="min-w-full rounded-lg border-2 border-blue-300"
            >
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
            </Field>
          </div>
          <ErrorMessage name="status" component="div" />
          {/** Let the admin create a list of requirements */}
          <p className="text-lg font-bold">Requirements</p>
          <div className="flex flex-row space-x-2">
            <Field
              type="text"
              name="_req"
              className=" rounded-lg border-2 border-blue-300"
            />
            <button
              type="button"
              onClick={() => {
                setFieldValue("requirements", [
                  ...values.requirements,
                  values._req,
                ]);
                setFieldValue("_req", "");
              }}
              className="rounded-lg bg-blue-500 p-1"
            >
              Add
            </button>
          </div>
          <div className="flex flex-col">
            {values.requirements.map((req, index) => (
              <div
                key={index}
                className="flex w-fit items-center space-x-4 p-4"
              >
                <p className="text-lg font-bold">{req}</p>
                <button
                  type="button"
                  onClick={() => {
                    setFieldValue(
                      "requirements",
                      values.requirements.filter((_, i) => i !== index)
                    );
                  }}
                  className="rounded-lg bg-red-500 p-1"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className=" rounded-lg bg-blue-500 p-1"
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

const AddRequirement = () => {
  return (
    <div className="flex flex-col">
      <input type="text" />
    </div>
  );
};
