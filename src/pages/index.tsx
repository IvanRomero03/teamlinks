import { type NextPage } from "next";
import Layout from "y/components/layout/layout";

const Home: NextPage = () => {
  return (
    <Layout
      Items={[
        { title: "hola", section: "hola" },
        { title: "hola", section: "hola" },
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
