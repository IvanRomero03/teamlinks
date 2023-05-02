import React from "react";
import Layout from "y/components/layout/layout";
import { data } from "y/components/candidate/data/application_data.js";

const orders = () => {
  return (
    <>
      <Layout
        Items={[
          { title: "Home", section: "candidate" },
          { title: "My Profile", section: "candidate/profile" },
          { title: "Applications", section: "candidate/applications" },
          { title: "Opportunities", section: "candidate/opportunities" },
        ]}
      >
        <div className="flex justify-between px-4 pt-4">
          <h2>Applications</h2>
          <h2>Welcome Back, Clint</h2>
        </div>
        <div className="mt-20 p-10">
          <div className="m-auto w-full overflow-y-auto rounded-lg border bg-white p-4">
            <div className="my-3 grid cursor-pointer grid-cols-2 items-center justify-between p-2 sm:grid-cols-3 md:grid-cols-4">
              <span>Name</span>
              <span className="text-right sm:text-left">Reviewed By:</span>
              <span className="hidden md:grid">Applied</span>
              <span className="hidden sm:grid">Status</span>
            </div>
            <ul>
              {data.map((application, id) => (
                <li
                  key={id}
                  className="my-3 grid cursor-pointer grid-cols-2 items-center justify-between rounded-lg bg-gray-100 p-2 hover:bg-gray-200 sm:grid-cols-3 md:grid-cols-4"
                >
                  <div className="flex">
                    <div className="rounded-lg bg-[#47d7ac] p-3">
                      <img
                        src={application.icon}
                        alt="icon"
                        className="h-6 w-6"
                      />
                    </div>
                    <div className="pl-4">
                      <p className="text-sm text-gray-800">
                        {application.name}
                      </p>
                    </div>
                  </div>
                  <p className="hidden md:flex">Under Construction</p>
                  <p className="hidden md:flex">{application.date}</p>
                  <p className="text-right text-black sm:text-left">
                    <span
                      className={
                        application.status === "Not Selected"
                          ? "w-fit rounded-lg bg-red-400 p-1"
                          : application.status === "Selected"
                          ? "w-fit rounded-lg bg-green-400 p-1"
                          : application.status === "Under Consideration"
                          ? "w-fit rounded-lg bg-yellow-400 p-1"
                          : "invisible h-0"
                      }
                    >
                      {application.status}
                    </span>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default orders;
