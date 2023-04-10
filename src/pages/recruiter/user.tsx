import { type NextPage } from "next";
import Layout from "y/components/layout/layout";
import {
  RiHome2Fill,
  RiLogoutBoxRLine,
  RiSettings2Fill,
  RiInformationFill,
  RiUser3Fill,
  RiSearchLine,
  RiTeamFill,
  RiFile2Fill,
  RiFile3Fill,
  RiArrowLeftCircleFill,
} from "react-icons/ri";

const User: NextPage = () => {
  return (
    <div className="flex flex-row gap-1">
      <div className="m-10 h-[32rem] w-96 rounded-lg bg-gray-100 shadow-lg">
        <div className="flex h-40 items-center border-b">
          <div className="m-auto flex h-20 w-20 items-center rounded-full bg-gray-500">
            <RiUser3Fill className="m-auto scale-[2] text-white" />
          </div>
        </div>
        <div className="p-5">
          <h1>user id</h1>
          <h1>last name, first name</h1>
          <h1>Position</h1>
          <h1>Years in Nagarro</h1>
          <h1>Main Technology: example</h1>
        </div>
      </div>
    </div>
  );
};
export default User;
