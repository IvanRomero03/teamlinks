import { type NextPage } from "next";
import Layout from "y/components/layout/layout";
import { RiUser3Fill } from "react-icons/ri";
import { api } from "y/utils/api";

const User: NextPage = () => {
  const { data, error } = api.recruiterInfo.getInfo.useQuery();
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
        <div className="flex flex-row gap-1">
          <div className="m-10 h-[32rem] w-96 rounded-lg bg-gray-100 shadow-lg">
            <div className="flex h-40 items-center border-b">
              <div className="m-auto flex h-20 w-20 items-center rounded-full bg-gray-500">
                <RiUser3Fill className="m-auto scale-[2] text-white" />
                {data?.image && (
                  <img
                    className="m-auto scale-[2] text-white"
                    src={data.image}
                    alt="user"
                  />
                )}
              </div>
            </div>
            <div className="p-5">
              <h1 className="text-2xl font-bold">{data?.data?.user.name}</h1>
              <h1 className="text-xl font-bold">{data?.data?.user.email}</h1>
              <p className="text-md ">{data?.data?.description}</p>
              <h1 className="text-xl font-bold">Skills</h1>
              <div className="flex flex-wrap gap-2">
                {data?.data?.RecruiterTechStack.map((skill) => (
                  <div className="rounded-lg bg-gray-500 p-2 text-white">
                    {skill.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default User;
