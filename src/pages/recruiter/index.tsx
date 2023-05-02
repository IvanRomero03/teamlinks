import { type NextPage } from "next";
import Layout from "y/components/layout/layout";
import { VictoryPie } from "victory";
import { api } from "y/utils/api";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const Home: NextPage = () => {
  const addToContext = api.context.addRecruiter.useMutation();
  const { data } = useSession();
  useEffect(() => {
    if (data?.user.id) {
      addToContext.mutate({
        id: data.user.id,
      });
    }
  }, [data]);

  const chartData: unknown[] = [
    { x: "Approved", y: 5 },
    { x: "Rejected", y: 5 },
    { x: "Pending", y: 5 },
  ];
  const notifications: { title: string; date: string }[] = [
    { title: "New application received", date: "2022-05-01 10:30:00" },
    { title: "Interview scheduled", date: "2022-04-30 15:20:00" },
    { title: "Application rejected", date: "2022-04-28 08:45:00" },
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
          <h1 className="m-2 justify-center text-lg">My metrics</h1>
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
        <div className="m-10 h-[32rem] w-80 rounded-lg bg-gray-100 shadow-lg">
          <h1 className="m-2 justify-center text-lg">Notifications</h1>
          {notifications.map((notification, index) => (
            <div key={index} className="border-b px-4 py-2">
              <h2 className="font-bold">{notification.title}</h2>
              <p className="text-sm text-gray-500">{notification.date}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
