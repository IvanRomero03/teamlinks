import { type NextPage } from "next";
import Layout from "y/components/layout/layout";
import { type GetServerSideProps } from "next";
import { getServerAuthSession, getServerIsAdmin } from "y/server/auth";
import ProjectItem from "y/components/admin/ProjectItem";
import { useRouter } from "next/router";

/*export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  const isAdmin = await getServerIsAdmin(ctx);
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
}; */

// Page for the admin to visualize all the projects
const Projects: NextPage = () => {
  const router = useRouter();
  const handleNewMember = () => {
    void router.push("/manager/add/project", "/add/project");
  };
  return (
    <Layout
      Items={[
        { title: "Home", section: "manager" },
        { title: "Projects", section: "manager/projects" },
        { title: "My Team", section: "manager/team" },
      ]}
    >
      <div className="mt-32 flex min-w-full justify-center">
        {/** White BG on center */}
        <div className="w-2/4 rounded-lg p-10 shadow-lg">
          <div className="flex items-center justify-between align-middle">
            <h1 className="mb-6 text-3xl font-bold text-white">Projects</h1>
            <button
              className="rounded-md bg-emerald-400 p-2"
              onClick={handleNewMember}
            >
              Add new member
            </button>
          </div>

          <ProjectItem
            name="Project 1"
            department="Department 1"
            progress={50}
          />
          <ProjectItem
            name="Project 2"
            department="Department 2"
            progress={100}
          />
          <ProjectItem
            name="Project 3"
            department="Department 3"
            progress={25}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Projects;
