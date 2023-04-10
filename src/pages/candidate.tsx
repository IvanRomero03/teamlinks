import { type NextPage } from "next";
import Layout from "y/components/layout/layout";

const Candidate: NextPage = () => {
    return(
        <Layout
            Items={[
                { title: "Home", section: "home" },
                { title: "About", section: "about" },
                { title: "My Info", section: "info" },
                { title: "Settings", section: "settings" },
            ]}
        >
        </Layout>
    );
};

export default Candidate;
