import { type NextPage } from "next";
import Layout from "y/components/layout/layout";
import Recultador from "./reclutador";

const Home: NextPage = () => {
  return (
    <Layout>
      <Recultador></Recultador>
    </Layout>
  );
};

export default Home;
