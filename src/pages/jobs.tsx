import { type NextPage } from "next";
import Layout from "y/components/layout/layout";
import Category from "y/components/Jobs/Category";
import JobItem from "y/components/Jobs/JobItem";

const Jobs: NextPage = () => {
  return (
    <Layout
      Items={[
        { title: "Jobs", section: "jobs" },
        { title: "About", section: "about" },
      ]}
    >
      <div className="mt-32 flex min-w-full">
        <div className="ml-32 flex h-fit w-1/4 border-separate border-spacing-4 flex-col space-y-2 rounded-lg border-2 border-white p-4 text-white">
          {/* Listado de categorias */}
          <Category
            name="Category"
            items={[
              "Engineering",
              "Design",
              "Human Resources",
              "Sales",
              "Marketing",
              "Finance",
              "Legal",
              "Operations",
              "Customer Success",
              "IT",
            ]}
          />
          <Category
            name="Location"
            items={[
              "Mexico",
              "United States",
              "United Kingdom",
              "Germany",
              "France",
              "Spain",
              "Italy",
              "Canada",
              "Brazil",
            ]}
          />
          <Category
            name="Type"
            items={[
              "Full Time",
              "Part Time",
              "Contract",
              "Internship",
              "Temporary",
            ]}
          />
          <Category
            name="Experience"
            items={[
              "Internship",
              "Entry Level",
              "Mid Level",
              "Senior Level",
              "Director",
            ]}
          />
        </div>
        <div className="flex w-1/2 flex-col">
          <div className="flex flex-row ">
            <input
              className="m-4 w-1/2 rounded-md p-2 opacity-75"
              type="text"
              placeholder="Search"
            />
            <button className="m-4 rounded-md bg-emerald-400 p-2 text-black hover:bg-emerald-200">
              {" "}
              Search
            </button>
          </div>
          <div className="flex flex-col">
            <JobItem
              name="Senior Frontend Engineer"
              location="Mexico"
              type="Full Time"
              category="Engineering"
              description="Frontend Engineer with 5+ years of experience for a full time position in Mexico City. We are looking for a senior engineer with experience in React, Typescript, and Node.js. Experience with GraphQL and AWS is a plus."
            />
            <JobItem
              name="Software Engineer Intern"
              location="United States"
              type="Internship"
              category="Engineering"
              description="Software Engineer Intern for a full time position in San Francisco. We are looking for a senior engineer with experience in React, Typescript, and Node.js. Experience with GraphQL and AWS is a plus."
            />
            <JobItem
              name="Senior Backend Engineer"
              location="United States"
              type="Full Time"
              category="Engineering"
              description="Backend Engineer with 5+ years of experience for a full time position in San Francisco. We are looking for a senior engineer with experience in React, Typescript, and Node.js. Experience with GraphQL and AWS is a plus."
            />
            <JobItem
              name="Recruiter"
              location="United States"
              type="Full Time"
              category="Human Resources"
              description="Recruiter for a full time position in San Francisco. We are looking for a senior engineer with experience in React, Typescript, and Node.js. Experience with GraphQL and AWS is a plus."
            />
            <JobItem
              name="Head of Sales"
              location="United States"
              type="Full Time"
              category="Sales"
              description="Head of Sales for a full time position in San Francisco. We are looking for a senior engineer with experience in React, Typescript, and Node.js. Experience with GraphQL and AWS is a plus."
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Jobs;
