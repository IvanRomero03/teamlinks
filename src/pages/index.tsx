import { type GetServerSideProps, type NextPage } from "next";
import Layout from "y/components/layout/layout";
import {
  getServerAuthSession,
  getServerIsAdmin,
  getServerIsRole,
} from "y/server/auth";

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

const Home: NextPage = () => {
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
