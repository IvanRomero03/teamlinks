import { type NextPage } from "next";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { api } from "y/utils/api";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { z } from "zod";
import { useEffect } from "react";

const Login: NextPage = () => {
  const router = useRouter();
  const { data: sessionData } = useSession();
  const query = router.query;
  const invite = api.getInvite.getInvite.useQuery({
    id: query.registerId as string,
  });

  useEffect(() => {
    if (!query.registerId) {
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
            invite.data?.email !== sessionData.user?.email
          ) {
            console.log("redirecting to home not same email");
            void router.push("/");
          }
        }
      }
    }
  }, [sessionData, query.registerId, invite]);

  const checkPermitions = () => {
    if (!query.registerId) {
      // redirect to home page

      void router.push("/");
      console.log("redirecting to home not registerId");
    }
    // Lo sig se puede hacer ssr
    if (sessionData) {
      const emailToCheck = invite.data?.email;
      if (invite.data && sessionData.user?.email !== emailToCheck) {
        console.log("redirecting to home not same email");
        void router.push("/");
      }
      // if (sessionData.user?.email !== query.registerId) {
      //   // redirect to home page
      //   console.log("redirecting to home not same email");
      //   void router.push("/");
      // }
      // redirect to home page
      console.log("redirecting to home from session");
      //router.push("/");
    }
  };

  useEffect(() => {
    checkPermitions();
  }, [sessionData, query.registerId]);

  console.log(invite);
  useEffect(() => {
    () => {
      console.log("useEffect");
      if (invite.isSuccess && invite.data == null) {
        void router.push("/");
        console.log("redirecting to home from invite");
        // not valid invite
      }
      console.log("useEffect2");
    };
  }, [invite]);

  const mutation = api.createRecruiter.createAccount.useMutation();

  const handleRegister = async (values: {
    name: string;
    email: string;
    country: string;
    mainTech: string;
    secondaryTech: string;
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
      mainTech: values.mainTech,
      secondaryTech: values.secondaryTech,
      invite: invite.data.id,
    });
    // if success redirect to home
    console.log("registering success");
    await router.push("/");
    console.log(result);
  };

  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center ">
        <img src="/images/logos_login.jpg" alt="logo" className="w-1/4" />
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
                  mainTech: "",
                  secondaryTech: "",
                }}
                onSubmit={handleRegister}
              >
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
                      type="select"
                      className="rounded-full bg-blue-400 px-10 py-3 font-semibold text-white no-underline transition hover:bg-blue-200"
                      required
                    >
                      <option value="Mexico">Mexico</option>
                      <option value="USA">USA</option>
                      <option value="Canada">Canada</option>
                    </Field>

                    <ErrorMessage name="country" component="div" />
                    <p>Main Tech</p>
                    <Field
                      name="mainTech"
                      type="text"
                      className="rounded-full bg-blue-400 px-10 py-3 font-semibold text-white no-underline transition hover:bg-blue-200"
                      required
                    />
                    <ErrorMessage name="mainTech" component="div" />
                    <p>Secondary Tech</p>
                    <Field
                      name="secondaryTech"
                      type="text"
                      className="rounded-full bg-blue-400 px-10 py-3 font-semibold text-white no-underline transition hover:bg-blue-200"
                      required
                    />
                    <ErrorMessage name="secondaryTech" component="div" />
                    <button
                      type="submit"
                      className="rounded-full bg-blue-400 px-10 py-3 font-semibold text-white no-underline transition hover:bg-blue-200"
                    >
                      Submit
                    </button>
                  </div>
                </Form>
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
