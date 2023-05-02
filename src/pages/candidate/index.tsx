import { type NextPage } from "next";
import Layout from "y/components/layout/layout";
import Aplicaciones from "y/components/candidate/aplicaciones";
import Usuario from "y/components/candidate/usuario";
import Opportunidades from "y/components/candidate/opportunities";
import { api } from "y/utils/api";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
const Candidate: NextPage = () => {
  const { data } = useSession();
  const utils = api.useContext();
  const router = useRouter();
  const { id } = router.query;
  console.log(id);
  console.log(data);
  const {
    data: PersonalInfo,
    isLoading: PersonalInfoLoading,
    isError: PersonalInfoError,
  } = api.candidateRouter.profile.getInfo.useQuery();
  return (
    <>
      <Layout
        Items={[
          { title: "Home", section: "candidate" },
          { title: "My Profile", section: "candidate/profile" },
          { title: "Applications", section: "candidate/applications" },
          { title: "Opportunities", section: "candidate/opportunities" },
        ]}
      >
        {data?.user && PersonalInfo && (
          <div className="pt-20">
            <div className="flex-col px-4 pt-4 text-3xl font-bold text-white">
              <h1 className="pb-2">My Dashboard</h1>
              <h1>Welcome, {data.user.name}</h1>
            </div>
            <div className="grid-col-1 gap-4 p-4 md:flex md:justify-center">
              <Usuario />
              <Aplicaciones />
              <Opportunidades />
            </div>
          </div>
        )}
      </Layout>
    </>
  );
};

export default Candidate;
