import { type NextPage } from "next";
import Layout from "y/components/layout/layout";

const Admin:NextPage=() =>{
return (
<Layout>
<h1>Welcome - Admin</h1>
<button id="new" className="rounded-md  bg-emerald-400  text-black  m-5" > New entry</button>
<button id="edit" className="rounded-md bg-emerald-400  text-black  m-5" > edit </button>



</Layout>
)
};

export default Admin;