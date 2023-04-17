import Link from "next/link";
import { useState, useEffect } from "react";

interface Item {
  section: string;
  title: string;
}
interface Props {
  Items: Item[];
}

const TopNav = ({ Items }: Props) => {
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
  }, [prevScrollPos, visible, handleScroll]);
  return (
    <div
      className={
        "animate-fade-in-down fixed top-0 left-0 right-0 z-50 m-5 mx-10 flex justify-end transition-opacity duration-300 hover:opacity-100" +
        (visible ? " opacity-100" : " opacity-0")
      }
      onScroll={handleScroll}
    >
      <div className="flex items-center p-4 align-middle text-white">
        {Items.map((item) => {
          return (
            <Item
              key={item.section}
              section={item.section}
              title={item.title}
            />
          );
        })}
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
      <p className="rounded-md p-4 text-white hover:bg-blue-200 hover:bg-opacity-10 hover:text-blue-400">
        {title}
      </p>
    </Link>
  );
};
