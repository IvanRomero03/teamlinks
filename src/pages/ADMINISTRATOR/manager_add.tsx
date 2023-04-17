import Layout from "y/components/layout/layout";
import { getServerAuthSession, getServerIsAdmin } from "y/server/auth";
import { NextPage, type GetServerSideProps } from "next";
import MemberItem from "y/components/admin/MemberItem";
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

const manager_add: NextPage = () => {
    return(

        <Layout Items={[
        { title: "Home", section: "ADMINISTRATOR" },
        
      ]}> 

      {/** Add new Recruiter form */}
      <div className="mt-32 flex min-w-full justify-center">
        {/** White BG on center */}
        <div className="rounded-lg bg-white p-10 shadow-lg">
          <h1 className="mb-6 text-3xl font-bold">Add new Manager</h1>
          <FormikForm />
        </div>
      </div>
    </Layout>
  );
};

export default manager_add;



const FormikForm = () => {
  const session = useSession();
  const mutate = api.admin.inviteRecruiter.inviteRecruiter.useMutation();
  return (
    <Formik
      initialValues={{ email: "" }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          if (session.status === "authenticated") {
            // call the protected procedure inviteRecruiter
            console.log("aqui");
            mutate.mutate({
              email: values.email,
            });
            const mutateInfo = mutate.data;
            console.log(mutateInfo);
            console.log("mutate");
          }
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


