import { type NextPage } from "next";
import Layout from "y/components/layout/layout";
import { getServerAuthSession, getServerIsAdmin } from "y/server/auth";
import { type GetServerSideProps } from "next";
import { api } from "y/utils/api";
import { useRouter } from "next/router";
import { useState } from "react";

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
// Page for the admin to view the specific project, edit it, and assign recruiters to it
const ProjectPage: NextPage = () => {
  const dataPlaceholder = {
    id: 1,
    name: "Project 1",
    description: "This is a project",
    country: "USA",
    status: "Active",
    type: "Onsite",
    startDate: "2021-01-01",
    endDate: "2021-01-01",
    recruiters: [
      {
        id: 1,
        name: "Recruiter 1",
      },
    ],
    positions: [
      {
        id: 1,
        name: "Position 1",
        total_positions: 2,
        opened_positions: 10,
        percentage: 20,
      },
    ],
  };
  const router = useRouter();
  const { id } = router.query;

  const [data, setData] = useState(dataPlaceholder);

  return (
    <Layout
      Items={[
        { title: "Home", section: "manager" },
        { title: "Projects", section: "manager/projects" },
        { title: "My Team", section: "manager/team" },
      ]}
    >
      <div className="mt-32 flex min-w-full justify-center">
        {/** Show normal info first */}
        <div className="w-2/4 rounded-lg p-10 shadow-lg">
          <div className="flex items-center justify-between align-middle">
            <h1 className="mb-6 text-3xl font-bold text-white">Project</h1>
            <p className="text-white">ID: {data.id}</p>
            <p className="text-white">Status: {data.status}</p>
            <p className="text-white">Type: {data.type}</p>

            <button
              className="rounded-md bg-emerald-400 p-2"
              onClick={() => {
                void router.push("/manager/edit/project", "/edit/project");
              }}
            >
              Edit
            </button>
          </div>
          <div className="flex flex-col">
            <p className="text-white">Name: {data.name}</p>
            <p className="text-white">Description: {data.description}</p>
            <p className="text-white">Country: {data.country}</p>
            <p className="text-white">Start Date: {data.startDate}</p>
            <p className="text-white">End Date: {data.endDate}</p>
          </div>
          <div className="flex flex-col">
            <h1 className="mb-6 text-3xl font-bold text-white">Recruiters</h1>
            {data.recruiters.map((recruiter) => (
              <div className="flex flex-row" key={recruiter.id}>
                <p className="text-white">ID: {recruiter.id}</p>
                <p className="text-white">Name: {recruiter.name}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col">
            <h1 className="mb-6 text-3xl font-bold text-white">Positions</h1>
            {data.positions.map((position) => (
              <div className="flex flex-col" key={position.id}>
                <p className="text-white">ID: {position.id}</p>
                <p className="text-white">Name: {position.name}</p>
                {/** Progress bar with percentage*/}
                <div className="flex flex-col">
                  <p className="text-white">
                    Total Positions: {position.total_positions}
                  </p>
                  <p className="text-white">
                    Opened Positions: {position.opened_positions}
                  </p>
                  <p className="text-white">
                    Percentage: {position.percentage}%
                  </p>
                  <div className="h-2 w-32 rounded-full bg-white">
                    <div className="h-full w-1/2 rounded-full bg-emerald-400"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProjectPage;
