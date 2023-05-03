import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { api } from "y/utils/api";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { z } from "zod";
import { useEffect } from "react";
import { type GetServerSideProps } from "next";
import { getServerAuthSession } from "y/server/auth";
import { toast } from "react-toastify";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);
  const registerId = ctx.params?.registerId;
  if (!registerId) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      registerId,
    },
  };
};

const Login = ({ registerId }: { registerId: string }) => {
  const router = useRouter();
  const { data: sessionData } = useSession();
  const query = router.query;
  const invite = api.getInvite.getInvite.useQuery({
    id: registerId,
  });

  useEffect(() => {
    if (!registerId) {
      console.log("redirecting to home not registerId");
      void router.push("/");
    } else {
      if (sessionData) {
        if (invite.isSuccess && invite.data == null) {
          console.log("redirecting to home from not invite");
          void router.push("/");
        } else {
          if (
            invite.isSuccess &&
            invite.data?.email != sessionData.user?.email
          ) {
            console.log("redirecting to home not same email");
            void router.push("/");
          }
        }
      }
    }
  }, [sessionData, query, invite]);

  const mutation = api.createRecruiter.createAccount.useMutation();
  const contextMutation = api.context.addRecruiter.useMutation();

  const handleRegister = async (values: {
    name: string;
    email: string;
    country: string;
    description: string;
    technologies: string[];
  }) => {
    console.log("registering");
    if (invite.isError || invite.data == null || invite.data.id == null) {
      console.log("error");
      return;
    }
    const result = await mutation.mutateAsync({
      name: values.name,
      email: values.email,
      country: values.country,
      description: values.description,
      technologies: values.technologies,
      invite: invite.data.id,
    });
    if (result.id) {
      contextMutation.mutate({
        id: result.id,
      });
    }
    // if success redirect to home
    toast.success("Registering Success!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    console.log("registering success");
    await router.push("/");
    console.log(result);
  };

  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center ">
        <img src="/images/logo_login.svg" alt="logo" className="w-1/6" />
        <h2 className="text-3xl font-thin">Register</h2>
        {invite.isFetching && <p>Loading...</p>}
        {invite.isError && <p>Error</p>}
        {!invite.isFetching && invite.isSuccess && !sessionData ? (
          <div>
            <p>Invite: {invite.data?.email}</p>
            <AuthShowcase />
          </div>
        ) : (
          invite.isSuccess &&
          invite.data &&
          sessionData && (
            <div>
              <Formik
                initialValues={{
                  name: sessionData?.user?.name ?? "",
                  email: invite.data?.email ?? "",
                  country: "Mexico",
                  description: "",
                  technologies: [],
                  _tech: "",
                }}
                onSubmit={handleRegister}
              >
                {({ values, setFieldValue }) => (
                  <Form>
                    <div className="flex flex-col items-center justify-center gap-4">
                      <p>Name</p>
                      <Field
                        name="name"
                        type="text"
                        placeholder="Name"
                        className="rounded-full bg-blue-400 px-10 py-3 font-semibold text-white no-underline transition hover:bg-blue-200"
                        required
                      />
                      <ErrorMessage name="name" component="div" />
                      <p>Email</p>
                      <Field
                        name="email"
                        type="email"
                        disabled
                        className="rounded-full bg-blue-400 px-10 py-3 font-semibold text-white no-underline transition "
                        required
                      />
                      <ErrorMessage name="email" component="div" />
                      <p>Country</p>
                      <Field
                        name="country"
                        as="select"
                        className="rounded-full bg-blue-400 px-10 py-3 font-semibold text-white no-underline transition hover:bg-blue-200"
                        required
                      >
                        <option value="Mexico">Mexico</option>
                        <option value="USA">USA</option>
                        <option value="Canada">Canada</option>
                      </Field>

                      <ErrorMessage name="country" component="div" />

                      <p>Techinal description</p>
                      <Field
                        name="description"
                        as="textarea"
                        className="rounded-full bg-blue-400 px-10 py-3 font-semibold text-white no-underline transition hover:bg-blue-200"
                        required
                      />
                      <ErrorMessage name="description" component="div" />

                      <p>Main technologies</p>
                      <Field
                        name="_tech"
                        type="text"
                        className="rounded-full bg-blue-400 px-10 py-3 font-semibold text-white no-underline transition hover:bg-blue-200"
                      />
                      <ErrorMessage name="_tech" component="div" />
                      <button
                        type="button"
                        onClick={() => {
                          setFieldValue("technologies", [
                            ...values.technologies,
                            values._tech,
                          ]);
                          setFieldValue("_tech", "");
                        }}
                      >
                        Add
                      </button>
                      <div className="flex flex-wrap gap-2">
                        {values.technologies.map((tech) => (
                          <div
                            key={tech}
                            className="rounded-full bg-blue-400 px-10 py-3 font-semibold text-white no-underline transition hover:bg-blue-200"
                          >
                            {tech}
                            <button
                              type="button"
                              onClick={() => {
                                setFieldValue(
                                  "technologies",
                                  values.technologies.filter((t) => t !== tech)
                                );
                              }}
                            >
                              X
                            </button>
                          </div>
                        ))}
                      </div>
                      <button
                        type="submit"
                        className="rounded-full bg-blue-400 px-10 py-3 font-semibold text-white no-underline transition hover:bg-blue-200"
                      >
                        Submit
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          )
        )}
      </div>
    </>
  );
};

export default Login;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  // const { data: secretMessage } = api.example.getSecretMessage.useQuery(
  //   undefined, // no input
  //   { enabled: sessionData?.user !== undefined }
  // );

  return (
    <div className="m-6 flex flex-col items-center justify-center gap-4">
      {/* <p className="bg-blue-400 text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p> */}
      <button
        className="rounded-full bg-blue-400 px-10 py-3 font-semibold text-white no-underline transition hover:bg-blue-200"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
