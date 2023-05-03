import { NextPage } from "next";
import Layout from "y/components/layout/layout";
import { useRouter } from "next/router";
import { api } from "y/utils/api";
import { Formik, Form, Field } from "formik";
import { useRef } from "react";
import ImagePreview from "y/components/candidate/ImagePreview";
import { set } from "zod";
import { useState } from "react";
import Modal from "y/components/modal";

const Apply: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, error } = api.candidateRouter.getPosition.useQuery({
    id: id as string,
  });

  const mutation = api.candidateRouter.createApply.useMutation();

  console.log(data);

  const fileRef = useRef(null);

  const [modalOpen, setModalOpen] = useState(false);

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
                <h1 className="font-bold text-2xl">Upload your CV:</h1>
                <p className="text-gray-500 text-xs ml-2">* Files Admitted: PDF</p>
                <Formik
                  initialValues={{
                    file: "",
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
                        onChange={(event) => {
                          setFieldValue("file", event.target.files[0]);
                        }}
                      />
                      {values.file && <ImagePreview file={values.file} />}
                      <button
                        className="my-2 rounded-md bg-[#47d7ac] p-2 font-bold text-[#0f172a] hover:bg-[#0f172a] hover:text-white w-full"
                        onClick={() => {
                          fileRef.current.click();
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
                  className="my-2 rounded-md bg-[#47d7ac] p-2 font-bold text-[#0f172a] hover:bg-[#0f172a] hover:text-white w-full"
                  onClick={() => {
                    setModalOpen(true);
                    mutation.mutate({
                      idPosition: id as string,
                    });
                  }}
                >
                  Apply
                </button>
              </div>
            </div>
          <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-2xl font-bold">Application Sent!</h1>
              <p className="text-gray-500 text-xs">You will be contacted soon</p>
              <button
                className="my-2 rounded-md bg-[#47d7ac] p-2 font-bold text-[#0f172a] hover:bg-[#0f172a] hover:text-white w-full"
                onClick={() => {
                  setModalOpen(false);
                  router.push("/candidate");
                }}
              >
                Return to Home
              </button>
            </div>
          </Modal>
          </div>
        )}
      </Layout>
    </>
  );
};

export default Apply;
