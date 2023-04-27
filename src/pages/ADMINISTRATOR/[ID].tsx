import { type NextPage } from "next";
import Layout from "y/components/layout/layout";
import { getServerAuthSession, getServerIsAdmin } from "y/server/auth";
import { type GetServerSideProps } from "next";
import { api } from "y/utils/api";
import { useRouter } from "next/router";
import { useState } from "react";
//import { Reclutador, ReclutadorProyectos } from "@prisma/client";
import { Field, Form, Formik } from "formik";

/*export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const isAdmin = await getServerIsAdmin(ctx);
    const session = await getServerAuthSession(ctx);
    if (!session) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
    if (!isAdmin) {
      // bad user type
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
*/
  const managerPage: NextPage = () => {
    const router = useRouter();
    const { id } = router.query;

    
  
    /*const { data, isError, isLoading } =
      api.admin.projectRouter.getProyect.useQuery({
        id: id as string,
      });*/
  
    return (
      <Layout
        Items={[
          { title: "Home", section: "ADMINISTRATOR" },
          
        ]}
      > 
       <h1 className=" font-bold text-white text-4xl"> - Manager Name: HUELL</h1>
       <h1 className="font-bold text-white text-3xl"> - Assigned project: R remix</h1>
       <h1 className="font-bold text-white text-3xl"> - Progress: 77%</h1>
       <h1 className="font-bold text-white text-2xl"> - Recruited people: Johansohn</h1>

       
      </Layout>
    );
  };
  
  export default managerPage;

