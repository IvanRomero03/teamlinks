import Layout from "y/components/layout/layout";
import { getServerAuthSession } from "y/server/auth";
import { NextPage, type GetServerSideProps } from "next";
import MemberItem from "y/components/admin/MemberItem";
import { useRouter } from "next/router";
import { api } from "y/utils/api";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);
  if (!session) {
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

// Page for the admin to check on the team and add new members
const Admin: NextPage = () => {
  const router = useRouter();
  const { data, isError, isLoading } = api.admin.recruiters.getTeam.useQuery();
  const handleNewMember = () => {
    void router.push("/admin/add/recruiter");
  };
  return (
    <Layout
      Items={[
        { title: "Home", section: "admin" },
        { title: "Projects", section: "admin/projects" },
        { title: "My Team", section: "admin/team" },
      ]}
    >
      {/** Team sercher and add new member on top, and members after */}
      <div className="mt-32 flex min-w-full justify-center">
        <div className=" flex w-3/4 flex-col justify-center">
          <h1 className="mb-6 text-3xl font-bold text-white">
            My Recruitment Team
          </h1>
          <div className="flex flex-row justify-between">
            {/** Search bar */}
            <div className="flex flex-row space-x-8">
              <input
                type="text"
                className="rounded-md border-2 border-gray-300 p-2"
                placeholder="Search for a team member"
              />
              <button className="rounded-md bg-emerald-400 p-2">Search</button>
            </div>
            {/** Add new member button */}
            <button
              className="rounded-md bg-emerald-400 p-2"
              onClick={handleNewMember}
            >
              Add new member
            </button>
          </div>
          {/** Members */}
          <div className="mt-10 flex w-3/4 flex-col justify-center">
            <div className="flex flex-col ">
              {isLoading ? (
                <div>Loading...</div>
              ) : isError ? (
                <div>Error</div>
              ) : (
                data?.map((member) => (
                  <MemberItem
                    name={member.user.name ?? "No name"}
                    category={member.tecPrincipal}
                    progress={Math.floor(Math.random() * 100)}
                    proyects={member.ReclutadorProyectos.map(
                      (proyect) => proyect.proyecto.nombre
                    )}
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

export default Admin;
