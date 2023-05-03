import { NextPage } from "next";
import Layout from "y/components/layout/layout";
import { type GetServerSideProps } from "next";
import {
  getServerAuthSession,
  getServerIsAdmin,
  getServerIsRole,
} from "y/server/auth";
import ProyectSmall from "y/components/admin/ProyectSmall";
import MemberSmall from "y/components/admin/MemberSmall";
import { api } from "y/utils/api";

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
  const { data: Projects, isLoading: ProjectsLoading } =
    api.admin.home.getProyects.useQuery();
  const { data: Members, isLoading: MembersLoading } =
    api.admin.home.getTeam.useQuery();

  return (
    <Layout
      Items={[
        { title: "Home", section: "admin" },
        { title: "Projects", section: "admin/projects" },
        { title: "My Team", section: "admin/team" },
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
              {ProjectsLoading ? (
                <p className="text-2xl font-bold text-white">Loading</p>
              ) : (
                Projects?.map((proyect) => (
                  <ProyectSmall
                    name={proyect.nombre}
                    progress={Math.floor(
                      (proyect.numPosicionesDis * 100) /
                        proyect.numPosicionesTot
                    )}
                    id={proyect.id}
                    key={proyect.id}
                  />
                ))
              )}
            </div>
            {/** Members overview */}
            <h2 className="text-2xl font-bold text-white">Team</h2>
            <div className="flex max-w-3xl flex-row space-x-8 overflow-auto scroll-auto rounded-md border-2 border-gray-300 bg-gray-400 p-8 ">
              {MembersLoading ? (
                <p className="text-2xl font-bold text-white">Loading</p>
              ) : (
                Members?.map((member) => (
                  <MemberSmall
                    name={String(member.user.name)}
                    progress={Math.floor(Math.random() * 100)}
                    key={member.id}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminPage;
