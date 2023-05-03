import React from "react";
import Modal from "../modal";
import Link from "next/link";
import { string } from "zod";

interface Props {
  id: string;
  name: string;
  amount: number;
  date: string;
  primTech: string;
  secTech: string;
  icon: string;
  location: string;
  description: string;
  modality: string;
  position: string;
  workTime: number;
  skills: string[];
}

const OpportunityItem: React.FC<Props> = ({
  id,
  name,
  amount,
  date,
  primTech,
  secTech,
  icon,
  location,
  description,
  modality,
  position,
  workTime,
  skills,
}) => {
  const [modalOpen, setModalOpen] = React.useState(false);

  return (
    <>
      <li key={id}>
        <div className="mt-5 flex cursor-pointer rounded-lg bg-gray-100 p-2 hover:bg-gray-200">
          <button className="flex" onClick={() => setModalOpen(true)}>
            {/* Insertar Iconos */}
            <div className="my-auto rounded-lg bg-[#47d7ac] p-3">
              <img src={icon} alt="icon" className="h-6 w-6" />
            </div>
            {/* Widget*/}
            <div className="flex justify-between">
              <div className="grid w-52 justify-items-center px-4">
                <p className="font-bold text-gray-800">{name}</p>
                <p className="my-auto text-sm sm:hidden md:hidden lg:flex">
                  Published: {date}
                </p>
              </div>
            </div>
          </button>
          <Link className="my-auto" href={"/candidate/profile?id=" + id}>
            <button
              className={
                amount >= 15
                  ? "my-auto ml-3 rounded-lg bg-green-300 p-3 text-sm font-bold hover:bg-green-400"
                  : amount > 0
                  ? "my-auto ml-3 rounded-lg bg-yellow-300 p-3 text-sm font-bold hover:bg-yellow-400"
                  : "invisible h-0 w-0"
              }
            >
              Apply
            </button>
          </Link>
        </div>
      </li>
      {modalOpen && (
        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
          <>
            <div className="w-auto rounded-lg bg-gray-300 p-2">
              <div className="flex justify-start p-2">
                <img src={icon} alt="icon" className="my-auto h-10 w-10" />
                <p className="p-2 text-2xl font-bold text-gray-800">{name}</p>
              </div>
              <div className="flex justify-start p-2">
                <div className="px-1">
                  <p className="pr-2 font-bold text-gray-800">Status:</p>
                  <div
                    className={
                      amount === 0
                        ? "my-auto h-fit w-fit rounded-lg bg-red-400 p-1"
                        : amount >= 15
                        ? "invisible h-0"
                        : amount < 15
                        ? "invisible h-0"
                        : "invisible h-0 w-0"
                    }
                  >
                    <p className="text-sm text-gray-800">Closed</p>
                  </div>
                  <div
                    className={
                      amount === 0
                        ? "invisible h-0"
                        : amount >= 15
                        ? "my-auto h-fit w-fit rounded-lg bg-green-400 p-1"
                        : amount < 15
                        ? "invisible h-0"
                        : "invisible h-0 w-0"
                    }
                  >
                    <p className="text-sm text-gray-800">Open</p>
                  </div>
                  <div
                    className={
                      amount === 0
                        ? "invisible h-0"
                        : amount >= 15
                        ? "invisible h-0"
                        : amount < 15
                        ? "my-auto h-fit w-fit rounded-lg bg-yellow-400 p-1"
                        : "invisible h-0 w-0"
                    }
                  >
                    <p className="text-sm text-gray-800">Restricted</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-between p-2">
                <div className="px-1">
                  <p className="font-bold text-gray-800">Location:</p>
                  <p className="text-gray-800">{location}</p>
                </div>
                <div className="px-1">
                  <p className="font-bold text-gray-800">Hours per Week:</p>
                  <p className="text-gray-800">{workTime} hrs</p>
                </div>
                <div className="px-1">
                  <p className="font-bold text-gray-800">Modality:</p>
                  <p className="text-gray-800">{modality}</p>
                </div>
                <div className="px-1">
                  <p className="font-bold text-gray-800">Position:</p>
                  <p className="text-gray-800">{position}</p>
                </div>
                <div className="px-1">
                  <p className="font-bold text-gray-800">Main Technology:</p>
                  <p className="text-gray-800">{primTech}</p>
                </div>
                <div className="px-1">
                  <p className="font-bold text-gray-800">Published:</p>
                  <p className="text-gray-800">{date}</p>
                </div>
              </div>
              <div className="p-2">
                <p className="font-bold text-gray-800">Description:</p>
                <p className="pl-2 text-gray-800">{description}</p>
              </div>
              <div className="p-2">
                <p className="font-bold text-gray-800">Skills:</p>
                <ul className="flex justify-start">
                  {skills.map((skill, indx) => (
                    <p
                      key={indx}
                      className="mx-1 rounded-md bg-gray-400 p-1 capitalize text-gray-800"
                    >
                      {skill}
                    </p>
                  ))}
                </ul>
              </div>
              <div className="flex justify-center p-2">
                <Link className="w-full" href={"/candidate/profile?id=" + id}>
                  <button
                    className={
                      amount >= 15
                        ? "my-auto ml-3 w-full rounded-lg bg-[#47d7ac] p-3 text-sm font-bold hover:bg-[#0f172a]  hover:text-white"
                        : amount > 0
                        ? "my-auto ml-2 w-full rounded-lg bg-[#47d7ac] p-3 text-sm font-bold hover:bg-[#0f172a]  hover:text-white"
                        : "invisible h-0"
                    }
                  >
                    Apply
                  </button>
                </Link>
              </div>
            </div>
          </>
        </Modal>
      )}
    </>
  );
};

export default OpportunityItem;
