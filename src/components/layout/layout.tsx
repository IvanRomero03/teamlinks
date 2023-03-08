import Head from "next/head";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import TopNav from "./TopNavBar";
import Image from "next/image";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const { status } = useSession();
  useEffect(() => {
    if (status === "unauthenticated") {
      window.location.href = "/login";
    }
  }, [status]);
  return (
    <html className="bg-slate-900">
      <Head>
        <title>teamlinks</title>
        <meta name="description" content="teamlinks" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-slate-900">
        <TopNav />
        {children}
        <Image
          src="/images/background.svg"
          alt="fondo"
          className="fixed bottom-0 w-1/2 self-end bg-fixed align-bottom"
        />
      </main>
    </html>
  );
};

export default Layout;
