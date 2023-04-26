import Layout from "y/components/layout/layout";
import { NextPage } from "next";
import { Formik, Form, Field } from "formik";
import { useSession } from "next-auth/react";
import React from "react";

const Profile: NextPage = () => {
  const fileInput = React.createRef();
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
          <h1 className= "text-3xl font-bold text-black">
            My Profile
          </h1>
          <p className= "text-xl text-black">
            Please fill out your profile information.
          </p>
          <h1 className="my-4 text-3xl font-bold text-black">
            Personal Information
          </h1>
          {data?.user && (
            <Formik
              initialValues={{
                name: data.user.name,
                email: data.user.email,
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
                  className="p-2 mt-4 rounded-md bg-[#47d7ac] text-[#0f172a] hover:bg-[#0f172a] hover:text-white font-bold"
                >
                  Save
                </button>
              </Form>
            </Formik>
          )}
          <h1 className="my-4 text-3xl font-bold text-black">
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
                <div className="flex w-1/2 flex-col mr-2">
                  <label htmlFor="start">Start</label>
                  <Field
                    id="start"
                    name="start"
                    as="input"
                    type="date"
                    className="rounded-md border-2 border-black p-2"
                  />
                </div>
                <div className="flex w-1/2 flex-col ml-2">
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
                className="p-2 mt-4 rounded-md bg-[#47d7ac] text-[#0f172a] hover:bg-[#0f172a] hover:text-white font-bold"
              >
                Add
              </button>
            </Form>
          </Formik>
          <h1 className="my-4 text-3xl font-bold text-black">Education</h1>
          <Formik initialValues={{
              school: "", 
              degree: "", 
              field: "", 
              description: "",
              start: "", 
              end: "",
            }}
              onSubmit={async (values) => {
                console.log(values);
            }}>
            <Form className="flex flex-col">
              <div className="flex flex-col">
                <label htmlFor="school">School</label>
                <Field
                  id="school"
                  name="school"
                  className="rounded-md border-2 border-black p-2 text-black"
                  required
                />
                <label htmlFor="degree">Degree</label>
                <Field
                  id="degree"
                  name="degree"
                  className="rounded-md border-2 border-black p-2 text-black"
                  required
                />
                <label htmlFor="field">Field</label>
                <Field
                  id="field"
                  name="field"
                  className="rounded-md border-2 border-black p-2 text-black"
                  as="select"
                  required
                >
                  <option value="Engineering">Engineering</option>
                  <option value="Human Resources">Human Resources</option>
                  <option value="Economics">Economics</option>
                  <option value="Arts">Arts</option>
                  <option value="Laws">Laws</option>
                  <option value="Medicine">Medicine</option>
                </Field>
                <label htmlFor="Description">Description</label>
                <Field
                  id="description"
                  name="description"
                  as="textarea"
                  className="rounded-md border-2 border-black p-2"
                />
                <div className="flex flex-row">
                  <div className="flex flex-col w-1/2 mr-2">
                    <label htmlFor="start">Start</label>
                    <Field
                      id="start"
                      name="start"
                      as="input"
                      type="date"
                      className="rounded-md border-2 border-black p-2"
                      required
                    />
                  </div>
                  <div className="flex flex-col w-1/2 ml-2">
                    <label htmlFor="start">End</label>
                    <Field
                      id="end"
                      name="end"
                      as="input"
                      type="date"
                      className="rounded-md border-2 border-black p-2"
                      required
                    />
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="p-2 mt-4 rounded-md bg-[#47d7ac] text-[#0f172a] hover:bg-[#0f172a] hover:text-white font-bold"
              >
                Add
              </button>
            </Form>
          </Formik>
          <h1 className="my-4 text-3xl font-bold text-black">Skills</h1>
          <Formik
            initialValues={{
              skill: "",
              level: "",
              certificate: "",
            }}
            onSubmit={async (values) => {
              console.log(values);
            }}
          >
            <Form className="flex flex-col">
              <div className="flex flex-col">
                <label htmlFor="skill">Skill</label>
                <Field
                  id="skill"
                  name="skill"
                  className="rounded-md border-2 border-black p-2 text-black"
                  required
                />
                <label htmlFor="level">Level</label>
                <Field
                  id="level"
                  name="level"
                  className="rounded-md border-2 border-black p-2 text-black"
                  as="select"
                  required
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </Field>
                <label htmlFor="certificate">Certificate</label>
                <Field
                  id="certificate"
                  name="certificate"
                  as="input"
                  type="file"
                  className="rounded-md p-2 text-black"
                />
              </div>
              <button
                type="submit"
                className="p-2 mt-4 rounded-md bg-[#47d7ac] text-[#0f172a] hover:bg-[#0f172a] hover:text-white font-bold"
              >Add</button>
            </Form>
          </Formik>
          <h1 className="my-4 text-3xl font-bold text-black">CV</h1>
          <Formik
            initialValues={{
              cv: "",
            }}
            onSubmit={async (values) => {
              console.log(values);
            }}
          >
            <Form className="flex flex-col">
              <div className="flex flex-col">
                <label htmlFor="cv">CV</label>
                <Field
                  id="cv"
                  name="cv"
                  as="input"
                  type="file"
                  className="rounded-md p-2 text-black"
                />
              </div>
              <button
                type="submit"
                className="p-2 mt-4 rounded-md bg-[#47d7ac] text-[#0f172a] hover:bg-[#0f172a] hover:text-white font-bold"
              >Add</button>
            </Form>
          </Formik>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
