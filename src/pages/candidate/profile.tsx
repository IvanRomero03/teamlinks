import Layout from "y/components/layout/layout";
import { NextPage } from "next";
import { Formik, Form, Field } from "formik";
import { useSession } from "next-auth/react";
import React from "react";
import { api } from "y/utils/api";
// query client
import { useRouter } from "next/router";
import { toast } from "react-toastify";

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
                  <label htmlFor="email" className="mt-1">
                    Email
                  </label>
                  <Field
                    id="email"
                    name="email"
                    as="input"
                    className="rounded-md border-2 border-black p-2"
                    disabled
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="phone" className="mt-1">
                    Phone
                  </label>
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
                  <label htmlFor="country" className="mt-1">
                    Country
                  </label>
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
                  <label htmlFor="description" className="mt-1">
                    Description
                  </label>
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
          <h1 className="my-4 text-3xl font-bold text-black">Experience</h1>
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
                  <label htmlFor="position" className="mt-1">
                    Position
                  </label>
                  <Field
                    id="position"
                    name="position"
                    as="input"
                    className="rounded-md border-2 border-black p-2"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="description" className="mt-1">
                    Description
                  </label>
                  <Field
                    id="description"
                    name="description"
                    as="textarea"
                    className="rounded-md border-2 border-black p-2"
                  />
                </div>
                <div className="mt-1 flex flex-row">
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
                <div className="mb-2 flex flex-row">
                  <button
                    type="submit"
                    className="mt-4 mr-2 w-1/2 rounded-md bg-[#47d7ac] p-2 font-bold text-[#0f172a] hover:bg-[#0f172a] hover:text-white"
                  >
                    Save
                  </button>
                  <button
                    type="submit"
                    className="mt-4 mr-2 w-1/2 rounded-md bg-red-500 p-2 font-bold text-white hover:bg-red-400"
                  >
                    Delete
                  </button>
                </div>
              </Form>
            </Formik>
          ))}
          <h3 className="my-2 text-lg font-bold text-black">
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
                className="mt-4 rounded-md bg-[#47d7ac] p-2 font-bold text-[#0f172a] hover:bg-[#0f172a] hover:text-white"
              >
                Add
              </button>
            </Form>
          </Formik>
          <h1 className="my-4 text-3xl font-bold text-black">Technologies</h1>
          <Formik
            initialValues={{
              name: "",
            }}
            onSubmit={async (values) => {
              console.log(values);
              TechnologiesCreateMutate(values);
              await utils.candidateRouter.profile.getTech.invalidate();
            }}
          >
            <Form className="mb-2 flex flex-row">
              <Field
                id="name"
                name="name"
                placeholder="Name"
                className="h-10 w-3/4 rounded-md border-2 border-black p-1"
                required
              />
              <button
                type="submit"
                className="mx-2 rounded-md bg-[#47d7ac] p-2 font-bold text-[#0f172a] hover:bg-[#0f172a] hover:text-white"
              >
                Add
              </button>
            </Form>
          </Formik>
          <div className="flex flex-row">
            {TechnologiesFetched &&
              Technologies?.map((tech) => (
                <div
                  className="my-2 mr-2 flex w-1/3 justify-between rounded-md border-2 border-black bg-gray-200"
                  key={tech.name}
                >
                  <h1 className="my-auto ml-2 font-bold text-black">
                    {tech.name}
                  </h1>
                  <button className="m-2 rounded-md bg-red-500 p-2 text-white hover:bg-red-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
              ))}
          </div>
          {id && (
            <button
              onClick={() => {
                toast.success("Updated Profile!", {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                });
                void router.push(`/candidate/apply/${String(id)}`);
              }}
              className="mt-4 w-full rounded-md bg-[#47d7ac] p-2 font-bold text-[#0f172a] hover:bg-[#0f172a] hover:text-white"
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
