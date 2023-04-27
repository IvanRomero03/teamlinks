import { NextPage } from "next";
import Layout from "y/components/layout/layout";
import { type GetServerSideProps } from "next";
import Manager from "y/components/ADMINISTRATOR/Manager";
import {
  getServerAuthSession,
  getServerIsAdmin,
  getServerIsRole,
} from "y/server/auth";
import {api} from "y/utils/api"



/*export const getServerSideProps: GetServerSideProps = async (context) => {
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
    const Administrator: NextPage = () => {
        return(
        <Layout Items={[
            { title: "Home", section: "ADMINISTRATOR" },
            { title: "ADD MANAGER", section: "ADMINISTRATOR/manager_add" },
            { title: "overview", section: "ADMINISTRATOR/overview" },
          ]}>
        
        
        <h1 className=" font-bold text-white ">WELCOME ADMIN</h1>
        <div className="flex flex-col space-y-8">
            <h2 className="text-2xl font-bold text-white">Projects</h2>
            {/** Managers overview */}
            <div className="flex max-w-3xl flex-row space-x-8 overflow-auto scroll-auto rounded-md border-2 border-gray-300 bg-gray-400 p-8 "></div>
        <Manager nameM="Ernesto" project="PYTHON" progress={95} id="1" recruiters="Marco,polo"/>
        <Manager nameM="ALEX" project="BASE DE DATOS" progress={49} id="2" recruiters="DEFALCO"/>  

        </div>



            
        </Layout>
            
        );
    };


    export default Administrator;

    //DESDE EL MANAGER VER UN RECLUTADOR EN ESPECÍFICO, 