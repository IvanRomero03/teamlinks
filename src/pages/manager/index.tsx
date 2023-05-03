import { NextPage } from "next";
import Layout from "y/components/layout/layout";
import { type GetServerSideProps } from "next";
import { getServerAuthSession, getServerIsAdmin } from "y/server/auth";
import ProyectSmall from "y/components/admin/ProyectSmall";
import MemberSmall from "y/components/admin/MemberSmall";

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
const ManagerPage: NextPage = () => {
  return (
    <Layout
      Items={[
        { title: "Home", section: "manager" },
        { title: "Projects", section: "manager/projects" },
        { title: "My Team", section: "manager/team" },
      ]}
    >
      <div className="mt-32 flex min-w-full  justify-center">
        <div className="">
          <h1 className="-my-8 mb-8 text-3xl font-bold text-white">
            My DashBoard
          </h1>

          <div className="flex flex-col space-y-8">
            <h2 className="text-2xl font-bold text-white">Projects</h2>
            {/** Projects overview */}
            <div className="flex max-w-3xl flex-row space-x-8 overflow-auto scroll-auto rounded-md border-2 border-gray-300 bg-gray-400 p-8 ">
              <ProyectSmall name="Proyecto 1" progress={75} id="1" />
              <ProyectSmall name="Proyecto 2" progress={25} id="2" />
              <ProyectSmall name="Proyecto 3" progress={50} id="3" />
              <ProyectSmall name="Proyecto 4" progress={90} id="4" />
              <ProyectSmall name="Proyecto 5" progress={75} id="5" />
              <ProyectSmall name="Proyecto 6" progress={25} id="6" />
            </div>
            {/** Members overview */}
            <h2 className="text-2xl font-bold text-white">Team</h2>
            <div className="flex max-w-3xl flex-row space-x-8 overflow-auto scroll-auto rounded-md border-2 border-gray-300 bg-gray-400 p-8 ">
              <MemberSmall name="Member 1" progress={75} />
              <MemberSmall name="Member 2" progress={25} />
              <MemberSmall name="Member 3" progress={50} />
              <MemberSmall name="Member 4" progress={90} />
              <MemberSmall name="Member 5" progress={75} />
              <MemberSmall name="Member 6" progress={25} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ManagerPage;
