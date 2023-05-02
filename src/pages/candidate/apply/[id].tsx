import { NextPage } from "next";
import Layout from "y/components/layout/layout";
import { useRouter } from "next/router";
import { api } from "y/utils/api";

const Apply: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, error } = api.candidateRouter.getPosition.useQuery({
    id: id as string,
  });

  const mutation = api.candidateRouter.createApply.useMutation();

  const mutationContext = api.context.addApplication.useMutation();

  console.log(data);

  const handleSubmit = async () => {
    const res = await mutation.mutateAsync({
      idPosition: String(id),
    });
    if (res.id) {
      mutationContext.mutate({
        id: res.id,
      });
    } else {
      console.log(res);
    }
  };

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
        {data && (
          <div className="pt-20">
            <div className="px-4 pt-4 text-3xl font-bold text-white">
              <h1 className="pb-2">{data.jobTitle}</h1>
            </div>
            <div className="flex justify-center">
              <div className="mt-5 flex grid w-3/5 rounded-lg bg-gray-200 p-2">
                <h1>Apply Now!</h1>
                <label className="font-bold">Curriculum Vitae: </label>
                <input type="file" />
                <button
                  className="rounded-md bg-emerald-400 p-2"
                  onClick={() => {
                    void handleSubmit();
                  }}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        )}
      </Layout>
    </>
  );
};

export default Apply;
