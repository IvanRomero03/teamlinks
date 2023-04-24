import Layout from "y/components/layout/layout";
import { NextPage } from "next";
import { Formik, Form, Field } from "formik";
import { useSession } from "next-auth/react";

const Profile: NextPage = () => {
  const { data } = useSession();
  console.log(data);
  return (
    <Layout
      Items={[
        { title: "Home", section: "candidate" },
        { title: "My User", section: "candidate/user" },
        { title: "Applications", section: "candidate/applications" },
        { title: "Opportunities", section: "candidate/opportunities" },
      ]}
    >
      <div className="flex-co mt-32 flex min-w-full justify-center px-4">
        <div className="w-1/2 flex-col rounded-md border-2 border-black bg-white p-4">
          <h1 className="text-center text-3xl font-bold text-black">
            My Profile
          </h1>
          <p className="text-center text-xl  text-black">
            Please fill out your profile information.
          </p>
          <h1 className="my-4 text-center text-3xl font-bold text-black">
            Personal Information
          </h1>
          {data?.user && (
            <Formik
              initialValues={{
                name: data.user.email,
                email: data.user.name,
                phone: "",
                country: "",
                description: "",
              }}
              onSubmit={async (values) => {
                console.log(values);
              }}
            >
              <Form className="flex flex-col">
                <div className="flex flex-col">
                  <label htmlFor="name">Name</label>
                  <Field
                    id="name"
                    name="name"
                    className="rounded-md border-2 border-black p-2 text-black"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="email">Email</label>
                  <Field
                    id="email"
                    name="email"
                    as="input"
                    className="rounded-md border-2 border-black p-2"
                    disabled
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="phone">Phone</label>
                  <Field
                    id="phone"
                    name="phone"
                    as="input"
                    type="tel"
                    className="rounded-md border-2 border-black p-2"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="country">Country</label>
                  <Field
                    id="country"
                    name="country"
                    as="select"
                    className="rounded-md border-2 border-black p-2"
                  >
                    <option value="USA">USA</option>
                    <option value="Mexico">Mexico</option>
                    <option value="Canada">Canada</option>
                  </Field>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="description">Description</label>
                  <Field
                    id="description"
                    name="description"
                    as="textarea"
                    className="rounded-md border-2 border-black p-2"
                  />
                </div>
                <button
                  type="submit"
                  className="mt-4 rounded-md bg-blue-500 p-2 text-white hover:bg-blue-300"
                >
                  Save
                </button>
              </Form>
            </Formik>
          )}
          <h1 className="my-4 text-center text-3xl font-bold text-black">
            Experience
          </h1>
          <Formik
            initialValues={{
              organization: "",
              position: "",
              description: "",
              start: "",
              end: "",
            }}
            onSubmit={async (values) => {
              console.log(values);
            }}
          >
            <Form className="flex flex-col">
              <div className="flex flex-col">
                <label htmlFor="organization">Organization</label>
                <Field
                  id="organization"
                  name="organization"
                  className="rounded-md border-2 border-black p-2 text-black"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="position">Position</label>
                <Field
                  id="position"
                  name="position"
                  as="input"
                  className="rounded-md border-2 border-black p-2"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="description">Description</label>
                <Field
                  id="description"
                  name="description"
                  as="textarea"
                  className="rounded-md border-2 border-black p-2"
                />
              </div>
              <div className="flex flex-row">
                <div className="flex w-1/2 flex-col">
                  <label htmlFor="start">Start</label>
                  <Field
                    id="start"
                    name="start"
                    as="input"
                    type="date"
                    className="rounded-md border-2 border-black p-2"
                  />
                </div>
                <div className="flex w-1/2 flex-col">
                  <label htmlFor="end">End</label>
                  <Field
                    id="end"
                    name="end"
                    as="input"
                    type="date"
                    className="rounded-md border-2 border-black p-2"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="mt-4 rounded-md bg-blue-500 p-2 text-white hover:bg-blue-300"
              >
                Add
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
