import { NextPage } from "next";
import Layout from "y/components/layout/layout";
import { type GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Manager from "y/components/ADMINISTRATOR/Manager";
import {
  getServerAuthSession,
  getServerIsAdmin,
  getServerIsRole,
} from "y/server/auth";
import { api } from "y/utils/api";

/*
export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getServerAuthSession(context);
  
    if (!session) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
  
    const isAdmin = await getServerIsAdmin(context);
    if (!isAdmin) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
    return {
      props: {},
    };
  };
*/
  const overview: NextPage = () => {
    const router = useRouter();
  const handleNewMember = () => {
    void router.push("/ADMINISTRATOR/overview_add", "/overview_add");
  };

  /*const { data, isError, isLoading, isFetched } =
    api.admin.projectRouter.getProyects.useQuery(); */
    
    return(

        <Layout
      Items={[
        { title: "Home", section: "ADMINISTRATOR" },
        
      ]}
    >
      <div className="mt-32 flex min-w-full justify-center">
        {/** White BG on center */}
        <div className="w-2/4 rounded-lg p-10 shadow-lg">
          <div className="flex items-center justify-between align-middle">
            <h1 className="mb-6 text-3xl font-bold text-white">Managers</h1>
            <button
              className="rounded-md bg-emerald-400 p-2"
              onClick={handleNewMember}
            >
              Add new manager
            </button>
          </div>
          <Manager
                id={"039392"}
                nameM={"MICHAEL"}
                project={"python23"}
                recruiters={"Mike"}
                progress={55}
              />
        </div>
      </div>
    </Layout>
  );
};

export default overview;




