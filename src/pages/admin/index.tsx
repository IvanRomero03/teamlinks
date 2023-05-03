import { NextPage } from "next";
import Layout from "y/components/layout/layout";
import { GetServerSideProps } from "next";
import {
  getServerAuthSession,
  getServerIsAdmin,
  getServerIsRole,
} from "y/server/auth";
import ProyectSmall from "y/components/admin/ProyectSmall";
import MemberSmall from "y/components/admin/MemberSmall";
import { api } from "y/utils/api";

const AdminPage: NextPage = () => {
  const { data: Managers, isLoading: ManagersLoading } =
    api.superadmin.getAdmins.useQuery();

  return (
    <Layout
      Items={[
        { title: "Home", section: "admin" },
        { title: "My Team", section: "admin/team" },
      ]}
    >
      <div className="mt-32 flex min-w-full justify-center">
        <div className="w-full max-w-6xl">
          <h1 className="mb-12 text-4xl font-bold text-white">My Dashboard</h1>

          <div className="flex flex-col space-y-8">
            {/** Members overview */}
            <h2 className="text-2xl font-bold text-white">Team</h2>
            <div className="flex max-w-3xl flex-row space-x-8 overflow-auto overflow-x-auto scroll-auto rounded-md border-2 border-gray-300 bg-gray-400 p-8 ">
              {ManagersLoading ? (
                <p className="text-2xl font-bold text-white">Loading</p>
              ) : (
                Managers?.map((member) => (
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
