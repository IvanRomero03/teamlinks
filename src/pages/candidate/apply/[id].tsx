import { NextPage } from 'next';
import Layout from "y/components/layout/layout";
import { useRouter } from 'next/router';
import { api } from "y/utils/api";

const Apply : NextPage = () => {
    const router = useRouter();
    const { id } = router.query;

    const {data, error} = api.candidateRouter.getPosition.useQuery({
        id: id as string
    });

    return(
        <>
            <Layout
                Items={[
                { title: "Home", section: "candidate" },
                { title: "My User", section: "candidate/user" },
                { title: "Applications", section: "candidate/applications" },
                { title: "Opportunities", section: "candidate/opportunities" },
                ]}
            >
                <div className="pt-20">
                    <div className="px-4 pt-4 text-3xl font-bold text-white">
                        <h1 className="pb-2">Your Information</h1>
                    </div>
                    <div className='flex justify-center'>
                        <div className="bg-gray-200 rounded-lg mt-5 p-2 flex w-3/5 grid">
                            <h1>Apply Now!</h1>
                            <div>
                                <label className='font-bold'>First Name: </label>
                                <input className='w-min my-2 mr-2 rounded-md' type="text" minLength={1}/>
                                <label className='font-bold'>Last Name: </label>
                                <input className='w-min my-2 mr-2 rounded-md' type="text" minLength={1}/>
                            </div>
                            <label className='font-bold'>Sex:</label>
                            <div>
                                <input className='ml-1' type="radio" /> Male
                                <input className='ml-1' type="radio" /> Female
                                <input className='ml-1' type="radio" /> Other
                            </div>
                            <label className='font-bold'>Curriculum Vitae: </label>
                            <input type="file" />
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default Apply;