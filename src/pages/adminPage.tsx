import { type NextPage } from "next";
import Layout from "y/components/layout/layout";

const Admin: NextPage = () => {
  return (
    <Layout
      Items={[
        { title: "Home", section: "home" },
        { title: "About", section: "about" },
        { title: "My Info", section: "info" },
        { title: "Settings", section: "settings" },
      ]}
    >
      <h1>Welcome - Admin</h1>
      <button id="new" className="m-5  rounded-md  bg-emerald-400  text-black">
        {" "}
        New entry
      </button>
      <button id="edit" className="m-5 rounded-md  bg-emerald-400  text-black">
        {" "}
        edit{" "}
      </button>
    </Layout>
  );
};

export default Admin;
