import React from "react";
import Image from "next/image";
import { api } from "y/utils/api";
// query client
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const Usuario = () => {
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
    <div
    className="relative col-span-1 m-auto h-[50vh] w-auto overflow-auto rounded-lg 
    border bg-white p-4 lg:h-[70vh] lg:w-[40vh]"
    >
      <h1 className="font-bold">My Profile</h1>
        <div className="grid justify-items-center">
          {/* User Info */}
          {data?.user && PersonalInfo && (
          <div className="grid justify-items-center">
            {/* Profile Pic */}
            <div className="mt-4 grid justify-items-center rounded-full border-4 border-[#47d7ac] w-fit">
              <Image
                src={data.user.image || "/images/user.png"}
                alt="Profile Pic"
                width={125}
                height={125}
                className="rounded-full p-2"
              />
            </div>
            <div className="my-3 grid cursor-pointer justify-items-center rounded-lg bg-gray-100 p-2 hover:bg-gray-200">
              <p className="font-bold text-gray-800">Name:</p>
              <p className="text-sm text-gray-800">
                {data.user.name}
              </p>
            </div>
            <div className="my-3 grid cursor-pointer justify-items-center rounded-lg bg-gray-100 p-2 hover:bg-gray-200">
              <p className="font-bold text-gray-800">Email:</p>
              <p className="text-sm text-gray-800">{data.user.email}</p>
            </div>
          </div>
          )}
          {/* Skills */}
          <div className="my-3 grid cursor-pointer justify-items-center rounded-lg bg-gray-100 p-2 hover:bg-gray-200">
            <p className="font-bold text-gray-800">Technologies:</p>
            <ol className="list-disc">
              {Technologies?.map((tech) => (
                <li className="text-sm text-gray-800">{tech.name}</li>
              ))}
            </ol>
          </div>
          {/* <div
            className={
              user.status === "Unemployed"
                ? "my-3 grid cursor-pointer justify-items-center rounded-lg bg-red-200 p-2 hover:bg-red-400"
                : "my-3 grid cursor-pointer justify-items-center rounded-lg bg-green-200 p-2 hover:bg-green-400"
            }
          >
            <p className="font-bold text-gray-800">Employment Status:</p>
            <p className="text-sm text-gray-800">{user.status}</p>
            <div
              className={
                user.status === "Unemployed"
                  ? "invisible h-0"
                  : "visible grid justify-items-center"
              }
            >
              <p className="font-bold text-gray-800">Position:</p>
              <p className="text-sm text-gray-800">{user.position}</p>
            </div>
          </div> */}
        </div>
    </div>
  );
};

export default Usuario;
