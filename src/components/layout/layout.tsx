import Head from "next/head";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import TopNav from "./TopNavBar";
import Image from "next/image";

interface Item {
  section: string;
  title: string;
}
interface Props {
  children: React.ReactNode;
  Items: Item[];
}

const Layout = ({ children, Items }: Props) => {
  // const { status } = useSession();
  // useEffect(() => {
  //   if (status === "unauthenticated") {
  //     window.location.href = "/login";
  //   }
  // }, [status]);
  return (
    <>
      <Head>
        <title>teamlinks</title>
        <meta name="description" content="teamlinks" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="z-10 flex min-h-screen flex-col bg-slate-900">
        <div className="flex-nowrap">
          <TopNav Items={Items} />
        </div>
        
        <div className="z-30">{children}</div>
        <img
          src="/images/background.svg"
          alt="fondo"
          className="fixed bottom-0 z-20 w-1/2 self-end bg-fixed align-bottom"
        />
      </main>
    </>
  );
};

export default Layout;
