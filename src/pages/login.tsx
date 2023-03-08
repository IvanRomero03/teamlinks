import { type NextPage } from "next";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "y/utils/api";

const Login: NextPage = () => {
  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center ">
        <img src="/images/logos_login.jpg" alt="logo" className="w-1/2" />
        <h2 className="text-3xl font-thin">Login</h2>
        <AuthShowcase />
      </div>
    </>
  );
};

export default Login;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  // const { data: secretMessage } = api.example.getSecretMessage.useQuery(
  //   undefined, // no input
  //   { enabled: sessionData?.user !== undefined }
  // );

  return (
    <div className="m-6 flex flex-col items-center justify-center gap-4">
      {/* <p className="bg-blue-400 text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p> */}
      <button
        className="rounded-full bg-blue-400 px-10 py-3 font-semibold text-white no-underline transition hover:bg-blue-200"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
