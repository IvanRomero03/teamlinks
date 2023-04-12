import { type NextPage } from "next";
import Layout from "y/components/layout/layout";
import Aplicaciones from "y/components/candidate/aplicaciones";
import Usuario from "y/components/candidate/usuario";
import Opportunidades from "y/components/candidate/opportunities";


const Candidate: NextPage = () => {
    return(
        
        <Layout
            Items={[
                { title: "Home", section: "candidate" },
                { title: "My User", section: "candidate/user" },
                { title: "Applications", section: "candidate/applications" },
                { title: "Opportunities", section: "candidate/opportunities" },
            ]}
        >
            <div className="pt-20">
                <div className="flex-col px-4 pt-4 text-white font-bold text-3xl">
                    <h1 className="pb-2">Dashboard</h1>
                    <h1>Welcome, User</h1>
                </div>
                <div className="p-4 grid md:grid-cols-3 grid-cols-1 gap-4">
                    <Usuario />
                    <Aplicaciones />
                    <Opportunidades />
                </div>
            </div>
        </Layout>
    );
};

export default Candidate;