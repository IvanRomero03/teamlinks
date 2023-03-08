"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

const TopNav = () => {
  const [visible, setVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
    setPrevScrollPos(currentScrollPos);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos, visible]);
  return (
    <div
      className={
        "animate-fade-in-down fixed top-0 left-0 right-0 z-50 m-5 mx-10 flex justify-end transition-opacity duration-300 hover:opacity-100" +
        (visible ? " opacity-100" : " opacity-0")
      }
      onScroll={handleScroll}
    >
      <div className="flex items-center p-4 align-middle text-white">
        <Item section="home" title="Home" />
        <Item section="about" title="About" />
        <Item section="info" title="My Info" />
        <Item section="settings" title="Settings" />
      </div>
    </div>
  );
};

export default TopNav;

const Item = ({ section, title }: { section: string; title: string }) => {
  return (
    <Link
      href={{
        pathname: "/" + section,
      }}
    >
      <p className="p-4 text-white hover:bg-blue-200 hover:bg-opacity-10 hover:text-blue-400">
        {title}
      </p>
    </Link>
  );
};
