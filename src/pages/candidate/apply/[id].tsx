import { NextPage } from "next";
import Layout from "y/components/layout/layout";
import { useRouter } from "next/router";
import { api } from "y/utils/api";
import { Formik, Form, Field } from "formik";
import { useRef } from "react";
import ImagePreview from "y/components/candidate/ImagePreview";

const Apply: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, error } = api.candidateRouter.getPosition.useQuery({
    id: id as string,
  });

  const mutation = api.candidateRouter.createApply.useMutation();

  console.log(data);

  const fileRef = useRef<HTMLInputElement>(null);

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
              <div className="mt-5 w-3/5 flex-col justify-center rounded-lg bg-gray-200 p-2">
                <h1 className="text-2xl font-bold">Upload your CV:</h1>
                <p className="ml-2 text-xs text-gray-500">
                  * Files Admitted: PDF
                </p>
                <Formik
                  initialValues={{
                    file: new Blob(),
                  }}
                  onSubmit={async (values) => {
                    console.log(values);
                  }}
                >
                  {({ values, setFieldValue }) => (
                    <Form>
                      <input
                        ref={fileRef}
                        hidden
                        type="file"
                        onChange={(e) => {
                          if (
                            e?.currentTarget?.files &&
                            e?.currentTarget?.files[0]
                          ) {
                            setFieldValue("file", e?.currentTarget?.files[0]);
                          }
                        }}
                      />
                      {values.file && <ImagePreview file={values.file} />}
                      <button
                        className="my-2 w-full rounded-md bg-[#47d7ac] p-2 font-bold text-[#0f172a] hover:bg-[#0f172a] hover:text-white"
                        onClick={() => {
                          fileRef?.current && fileRef?.current?.click();
                        }}
                      >
                        Select File
                      </button>
                    </Form>
                  )}
                </Formik>
                {/* <h1 className="font-bold text-2xl mb-3">Upload your CV: </h1>
                <input type="file" />
                <p className="text-gray-500 text-xs ml-2">* Files Admitted: PDF</p> */}
                <button
                  className="my-2 w-full rounded-md bg-[#47d7ac] p-2 font-bold text-[#0f172a] hover:bg-[#0f172a] hover:text-white"
                  onClick={() => {
                    mutation.mutate({
                      idPosition: id as string,
                    });
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
