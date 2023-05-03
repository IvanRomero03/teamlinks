import { NextPage } from "next";
import Layout from "y/components/layout/layout";
import { GetServerSideProps } from "next";
import {
  getServerAuthSession,
  getServerIsAdmin,
  getServerIsRole,
} from "y/server/auth";
import ProjectSmall from "y/components/admin/ProyectSmall";
import MemberSmall from "y/components/admin/MemberSmall";

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

const AdminPage: NextPage = () => {
  return (
    <Layout
      Items={[
        { title: "Home", section: "admin" },
        { title: "Projects", section: "admin/projects" },
        { title: "My Team", section: "admin/team" },
      ]}
    >
      <div className="mt-32 flex min-w-full justify-center">
        <div className="w-full max-w-6xl">
          <h1 className="mb-12 text-4xl font-bold text-white">My Dashboard</h1>

          <div className="grid grid-cols-1 gap-12">
            <div className="rounded-lg bg-gray-700 p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-white">Projects</h2>
              {/* Projects overview */}
              <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                <ProjectSmall name="Project 1" progress={75} id="1" />
                <ProjectSmall name="Project 2" progress={25} id="2" />
                <ProjectSmall name="Project 3" progress={50} id="3" />
                <ProjectSmall name="Project 4" progress={90} id="4" />
                <ProjectSmall name="Project 5" progress={75} id="5" />
                <ProjectSmall name="Project 6" progress={25} id="6" />
              </div>
            </div>
            <div className="rounded-lg bg-gray-700 p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-white">Team</h2>
              {/* Members overview */}
              <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
      </div>
    </Layout>
  );
};

export default AdminPage;
