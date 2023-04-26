import Layout from "y/components/layout/layout";
import { NextPage } from "next";
import { Formik, Form, Field } from "formik";
import { useSession } from "next-auth/react";
import React from "react";
import { api } from "y/utils/api";
// query client
import { useRouter } from "next/router";

const Profile: NextPage = () => {
  const { data } = useSession();
  const utils = api.useContext();
  const router = useRouter();
  const { id } = router.query;
  console.log(id);
  console.log(data);
  const {
    data: PersonalInfo,
    isLoading: PersonalInfoLoading,
    isError: PersonalInfoError,
    isFetched: PersonalInfoFetched,
  } = api.candidateRouter.profile.getInfo.useQuery();
  const { mutate: PersonalInfoMutate } =
    api.candidateRouter.profile.updateInfo.useMutation();
  const {
    data: Experience,
    isLoading: ExperienceLoading,
    isError: ExperienceError,
    isFetched: ExperienceFetched,
  } = api.candidateRouter.profile.getExpirience.useQuery();
  const { mutate: ExperienceCreateMutate } =
    api.candidateRouter.profile.createExp.useMutation();
  const { mutate: ExperienceUpdateMutate } =
    api.candidateRouter.profile.updateExp.useMutation();
  const {
    data: Technologies,
    isLoading: TechnologiesLoading,
    isError: TechnologiesError,
    isFetched: TechnologiesFetched,
  } = api.candidateRouter.profile.getTech.useQuery();
  const { mutate: TechnologiesCreateMutate } =
    api.candidateRouter.profile.createTech.useMutation();
  return (
    <Layout
      Items={[
        { title: "Home", section: "candidate" },
        { title: "My Profile", section: "candidate/profile" },
        { title: "Applications", section: "candidate/applications" },
        { title: "Opportunities", section: "candidate/opportunities" },
      ]}
    >
      <div className="flex-co mt-32 flex min-w-full justify-center px-4">
        <div className="w-1/2 flex-col rounded-md border-2 border-black bg-white p-4">
          <h1 className="text-3xl font-bold text-black">My Profile</h1>
          <p className="text-xl text-black">
            Please fill out your profile information.
          </p>
          <h1 className="my-4 text-3xl font-bold text-black">
            Personal Information
          </h1>
          {data?.user && PersonalInfo && (
            <Formik
              initialValues={{
                name: data.user.name,
                email: data.user.email,
                phone: PersonalInfo.phone,
                country: PersonalInfo.pais,
                description: PersonalInfo.description,
              }}
              onSubmit={(values) => {
                PersonalInfoMutate({
                  description: values.description,
                  pais: values.country as string,
                  phone: values.phone as string,
                });
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
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="country">Country</label>
                  <Field
                    id="country"
                    name="country"
                    as="select"
                    className="rounded-md border-2 border-black p-2"
                    required
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
                  className="mt-4 rounded-md bg-[#47d7ac] p-2 font-bold text-[#0f172a] hover:bg-[#0f172a] hover:text-white"
                >
                  Save
                </button>
              </Form>
            </Formik>
          )}
          <h1 className="my-4 text-center text-3xl font-bold text-black">
            Experience
          </h1>
          {Experience?.map((exp) => (
            <Formik
              key={exp.id}
              initialValues={{
                organization: exp.employer,
                position: exp.position,
                description: exp.description,
                start: exp.startDate,
                end: exp.endDate,
              }}
              onSubmit={(values) => {
                //update
                console.log(values);
                ExperienceUpdateMutate({
                  id: exp.id,
                  position: values.position,
                  description: values.description,
                  end: values.end,
                  start: values.start,
                  organization: values.organization,
                });
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
                  Save
                </button>
              </Form>
            </Formik>
          ))}
          <h3 className="text-md my-2 text-center text-black">
            Add new experience
          </h3>
          <Formik
            initialValues={{
              organization: "",
              position: "",
              description: "",
              start: "",
              end: "",
            }}
            onSubmit={async (values, { resetForm }) => {
              console.log(values);
              ExperienceCreateMutate(values);
              resetForm();
              await utils.candidateRouter.profile.getExpirience.invalidate();
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
                <div className="mr-2 flex w-1/2 flex-col">
                  <label htmlFor="start">Start</label>
                  <Field
                    id="start"
                    name="start"
                    as="input"
                    type="date"
                    className="rounded-md border-2 border-black p-2"
                  />
                </div>
                <div className="ml-2 flex w-1/2 flex-col">
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
          <h1 className="my-4 text-center text-3xl font-bold text-black">
            Technologies
          </h1>
          <Formik
            initialValues={{ name: "" }}
            onSubmit={async (values) => {
              console.log(values);
              TechnologiesCreateMutate(values);
              await utils.candidateRouter.profile.getTech.invalidate();
            }}
          >
            <Form className="flex flex-row">
              <Field
                id="name"
                name="name"
                placeholder="Technology name"
                className="w-3/4 rounded-md border-2 border-black p-2"
                required
              />
              <button
                type="submit"
                className="mt-4 w-1/4 rounded-md bg-blue-500 p-2 text-white hover:bg-blue-300"
              >
                Add
              </button>
            </Form>
          </Formik>
          {TechnologiesFetched &&
            Technologies?.map((tech) => (
              <div
                className="flex justify-between rounded-md border-2 border-black bg-gray-400 p-2 align-middle"
                key={tech.name}
              >
                <h1 className="text-xl font-bold text-black">{tech.name}</h1>
                <button className="rounded-md bg-red-500 p-2 text-white hover:bg-red-300">
                  Delete
                </button>
              </div>
            ))}
          {id && (
            <button
              onClick={() => {
                void router.push(`/candidate/apply/${String(id)}`);
              }}
              className="mt-4 w-full rounded-md bg-blue-500 p-2 text-white hover:bg-blue-300"
            >
              Continue
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
