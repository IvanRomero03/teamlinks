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

  const { data: notificationsData, error: notificationsError } =
    api.recruiterInfo.notifications.getNotifications.useQuery();

  if (notificationsError) {
    return (
      <div>
        <p>Error loading notifications: {notificationsError.message}</p>
      </div>
    );
  }

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
        <div className="m-10 h-[32rem] w-96 rounded-lg bg-gray-100 shadow-lg">
          <h1 className="m-2 justify-center text-lg">Notifications</h1>
          <ul className="divide-y divide-gray-300">
            {notificationsData?.map((notification, index) => (
              <li key={index} className="p-2">
                <div className="mb-2 rounded-lg border-l-4 border-teal-600 bg-white p-3 shadow-md">
                  <p className="font-semibold text-teal-600">
                    New Application!
                  </p>
                  <p>{notification.candidato?.user.name}</p>
                  <p>{notification.Puestos?.jobTitle}</p>
                  <p>
                    Date:{" "}
                    {notification.fechaCreacion.toLocaleDateString("en-US")}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
