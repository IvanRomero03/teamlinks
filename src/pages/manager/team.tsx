import Layout from "y/components/layout/layout";
import { getServerAuthSession } from "y/server/auth";
import { NextPage, type GetServerSideProps } from "next";
import MemberItem from "y/components/admin/MemberItem";
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
  return {
    props: {
      session,
    },
  };
};*/

// Page for the admin to check on the team and add new members
const Admin: NextPage = () => {
  const router = useRouter();
  const handleNewMember = () => {
    void router.push("/manager/add/recruiter");
  };
  return (
    <Layout
      Items={[
        { title: "Home", section: "manager" },
        { title: "Projects", section: "manager/projects" },
        { title: "My Team", section: "manager/team" },
      ]}
    >
      {/** Team sercher and add new member on top, and members after */}
      <div className="mt-32 flex min-w-full justify-center">
        <div className=" flex w-3/4 flex-col justify-center">
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
              <MemberItem
                name="John Doe"
                category="Techologies of Information"
                progress={75}
                proyects={["Proyect 1", "Proyect 2", "Proyect 3"]}
              />
              <MemberItem
                name="Jose Perez"
                category="Techologies of Information"
                progress={68}
                proyects={["Proyect 1", "Proyect 2", "Proyect 3"]}
              />
              <MemberItem
                name="Juan Perez"
                category="Engineering"
                progress={49}
                proyects={["Proyect 1", "Proyect 2", "Proyect 3"]}
              />
              <MemberItem
                name="George Washington"
                category="Human Resources"
                progress={95}
                proyects={["Proyect 1", "Proyect 2", "Proyect 3"]}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Admin;
