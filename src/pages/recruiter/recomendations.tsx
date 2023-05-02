import { type NextPage } from "next";
import Layout from "y/components/layout/layout";
import { VictoryPie } from "victory";
import { api } from "y/utils/api";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const Home: NextPage = () => {
  const matches = api.context.getRecruiter_Applicants.useQuery({
    id: "clgvg33lu0000mm088wiwu5o6",
  });
  console.log(matches.data);
  // [{id: 'cuid', similarity: float: name: string}]
  return (
    <Layout
      Items={[
        { title: "Home", section: "recruiter" },
        { title: "My User", section: "recruiter/user" },
        { title: "My Projects", section: "recruiter/projects" },
        { title: "Applications", section: "recruiter/applications" },
      ]}
    >
      <div className="mt-32 flex min-w-full flex-row justify-center gap-1">
        <div className="m-10 h-[32rem] w-96 rounded-lg bg-gray-100 shadow-lg">
          <h1 className="m-2 text-lg">My Matches</h1>
          {(matches?.data?.length ?? 0) > 0 ? (
            matches.data?.map((match) => {
              return (
                <div className="flex flex-row justify-between" key={match.id}>
                  <div className="m-2 text-lg">{match.name}</div>
                  <div className="m-2 text-lg">{match.similarity}</div>
                </div>
              );
            })
          ) : (
            <div className="m-2 text-lg">No matches yet</div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
