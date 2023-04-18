import React from "react";
import Image from "next/image";
import { data } from "./data/user_data.js";

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
  return (
    <div
      className="relative col-span-1 m-auto h-[50vh] w-auto overflow-auto rounded-lg 
        border bg-white p-4 lg:h-[70vh] lg:w-[40vh]"
    >
      <h1 className="font-bold">My Profile</h1>
      {data.map((user, index) => (
        <div className="grid justify-items-center" key={index}>
          <img
            src={
              user.sex === "Male"
                ? "images/Male_User.png"
                : "images/Female_User.png"
            }
            alt="User"
            className="h-32 w-auto py-4"
          />
          <div className="my-3 grid cursor-pointer justify-items-center rounded-lg bg-gray-100 p-2 hover:bg-gray-200">
            <p className="font-bold text-gray-800">Name:</p>
            <p className="text-sm text-gray-800">
              {user.lastName}, {user.firstName}
            </p>
          </div>
          <div className="my-3 grid cursor-pointer justify-items-center rounded-lg bg-gray-100 p-2 hover:bg-gray-200">
            <p className="font-bold text-gray-800">Birthday:</p>
            <p className="text-sm text-gray-800">
              {month[user.bday.getMonth()]} {user.bday.getDate()},{" "}
              {user.bday.getFullYear()}
            </p>
          </div>
          <div className="my-3 grid cursor-pointer justify-items-center rounded-lg bg-gray-100 p-2 hover:bg-gray-200">
            <p className="font-bold text-gray-800">Technologies:</p>
            <ol className="list-disc pl-2">
              <li className="text-sm text-gray-800">{user.primTech}</li>
              <li className="text-sm text-gray-800">{user.secTech}</li>
            </ol>
          </div>
          <div
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
          </div>
        </div>
      ))}
    </div>
  );
};

export default Usuario;
