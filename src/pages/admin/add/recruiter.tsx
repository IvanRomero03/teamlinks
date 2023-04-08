import Layout from "y/components/layout/layout";
import { getServerAuthSession } from "y/server/auth";
import { NextPage, type GetServerSideProps } from "next";
import MemberItem from "y/components/admin/MemberItem";
import { Formik, Form, Field, ErrorMessage } from "formik";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);
  if (!session) {
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
        { title: "Home", section: "home" },
        { title: "About", section: "about" },
        { title: "My Info", section: "info" },
        { title: "Settings", section: "settings" },
      ]}
    >
      {/** Add new Recruiter form */}
      <div className="mt-32 flex min-w-full justify-center">
        {/** White BG on center */}
        <div className="rounded-lg bg-white p-10 shadow-lg">
          <h1 className="mb-6 text-3xl font-bold">Add new Recruiter</h1>
          <FormikForm />
        </div>
      </div>
    </Layout>
  );
};

export default RecruiterForm;

const FormikForm = () => {
  return (
    <Formik
      initialValues={{ email: "" }}
      validate={(values) => {
        const errors = {};
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="space-x-2">
          <Field
            type="email"
            name="email"
            className="w-3/4 rounded-md border-2 border-black p-2"
          />
          <ErrorMessage name="email" component="div" />
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};
