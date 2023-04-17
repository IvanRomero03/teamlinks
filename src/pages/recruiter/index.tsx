import { type NextPage } from "next";
import Layout from "y/components/layout/layout";
import { VictoryPie } from "victory";

const Home: NextPage = () => {
  const chartData: unknown[] = [
    { x: "Approved", y: 5 },
    { x: "Rejected", y: 5 },
    { x: "Pending", y: 5 },
  ];
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
          <h1 className="m-2 text-lg">My metrics</h1>
          <div className="height-[20rem] m-auto w-[12rem] scale-[1.6]">
            <VictoryPie
              data={chartData}
              colorScale={["#0088FE", "#00C49F", "#FF8042"]}
              radius={100}
            />
          </div>
          <div className="m-auto my-6 flex w-[22rem] flex-row items-center justify-center gap-2">
            <div className="rounded-lg bg-gray-200 p-2 shadow-lg">
              new applications: 5
            </div>
            <div className="rounded-lg bg-gray-200 p-2 shadow-lg">
              total applications: 15
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
