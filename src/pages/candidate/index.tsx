import { type NextPage } from "next";
import Layout from "y/components/layout/layout";
import Aplicaciones from "y/components/candidate/aplicaciones";
import Usuario from "y/components/candidate/usuario";
import Opportunidades from "y/components/candidate/opportunities";
import { data } from "y/components/candidate/data/user_data.js";

const Candidate: NextPage = () => {
  return (
    <>
      <Layout
        Items={[
          { title: "Home", section: "candidate" },
          { title: "My User", section: "candidate/user" },
          { title: "Applications", section: "candidate/applications" },
          { title: "Opportunities", section: "jobs" },
        ]}
      >
        {data.map((user) => (
          <div className="pt-20">
            <div className="flex-col px-4 pt-4 text-3xl font-bold text-white">
              <h1 className="pb-2">My Dashboard</h1>
              <h1>Welcome, {user.firstName}</h1>
            </div>
            <div className="grid-col-1 gap-4 p-4 md:flex md:justify-center">
              <Usuario />
              <Aplicaciones />
              <Opportunidades />
            </div>
          </div>
        ))}
      </Layout>
    </>
  );
};

export default Candidate;
