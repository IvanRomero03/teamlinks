import {
  InferGetServerSidePropsType,
  type GetServerSideProps,
  type NextPage,
} from "next";
import Layout from "y/components/layout/layout";
import { getServerAuthSession, getServerIsRole } from "y/server/auth";
import { signOut } from "next-auth/react";
import { Session } from "next-auth";
import { useEffect } from "react";

interface Props {
  session: Session | null;
  signOut?: boolean;
}

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
  const isRole = await getServerIsRole(ctx);
  console.log(isRole);
  if (isRole == null) {
    // bad user type
    console.log("bad user type");
    // TOAST
    const signOutF = true;

    return {
      props: {
        session,
        signOutF,
      },
    };
    // await signOut({
    //   callbackUrl: "/login",
    // });
    // return {
    //   redirect: {
    //     destination: "/login",
    //     permanent: false,
    //   },
    // };
  }
  if (isRole == "admin") {
    return {
      redirect: {
        destination: "/admin",
        permanent: false,
      },
    };
  }
  if (isRole == "recruiter") {
    return {
      redirect: {
        destination: "/recruiter",
        permanent: false,
      },
    };
  }
  if (isRole == "candidate") {
    return {
      redirect: {
        destination: "/candidate",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
      signOutF: false,
    },
  };
};

const Home: NextPage = ({
  session,
  signOutF,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  useEffect(() => {
    if (signOutF == true) {
      void signOut({
        callbackUrl: "/login",
      });
    }
  }, []);
  return (
    <Layout
      Items={[
        { title: "Home", section: "home" },
        { title: "About", section: "about" },
        { title: "My Info", section: "info" },
        { title: "Settings", section: "settings" },
      ]}
    >
      <div className="flex min-h-screen flex-col items-center justify-center ">
        hola
      </div>
      <div className="flex min-h-screen flex-col items-center justify-center ">
        hola
      </div>
    </Layout>
  );
};

export default Home;
