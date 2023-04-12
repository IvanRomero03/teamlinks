import React from "react";
import Image from "next/image";
import {data} from "./data/user_data.js"

const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const Usuario = () => {
    return(
        <div className="w-auto col-span-1 relative lg:h-[70vh] h-[50vh] m-auto p-4 
        border rounded-lg bg-white overflow-auto lg:w-[40vh]">
        <h1 className="font-bold">My Profile</h1>    
            {data.map((user) => (
                    <div className="grid justify-items-center">
                        <img src={(user.sex === 'Male' ? 'images/Male_User.png' : 'images/Female_User.png')} alt="User" className="w-auto h-32 py-4" />
                        <div className="bg-gray-100 hover:bg-gray-200 rounded-lg grid justify-items-center my-3 p-2 cursor-pointer">
                            <p className="text-gray-800 font-bold">Name:</p>
                            <p className="text-gray-800 text-sm">{user.lastName}, {user.firstName}</p>
                        </div>
                        <div className="bg-gray-100 hover:bg-gray-200 rounded-lg grid justify-items-center my-3 p-2 cursor-pointer">
                            <p className="text-gray-800 font-bold">Birthday:</p>
                            <p className="text-gray-800 text-sm">{month[user.bday.getMonth()]} {user.bday.getDate()}, {user.bday.getFullYear()}</p>
                        </div>
                        <div className="bg-gray-100 hover:bg-gray-200 rounded-lg grid justify-items-center my-3 p-2 cursor-pointer">
                            <p className="text-gray-800 font-bold">Technologies:</p>
                            <ol className="list-disc pl-2">
                                <li className="text-gray-800 text-sm">{user.primTech}</li>
                                <li className="text-gray-800 text-sm">{user.secTech}</li>
                            </ol>
                        </div>
                        <div className={(user.status === "Unemployed" ? 'rounded-lg grid justify-items-center my-3 p-2 cursor-pointer bg-red-200 hover:bg-red-400' : 'rounded-lg grid justify-items-center my-3 p-2 cursor-pointer bg-green-200 hover:bg-green-400')}>
                            <p className="text-gray-800 font-bold">Employment Status:</p>
                            <p className="text-gray-800 text-sm">{user.status}</p>
                            <div className={(user.status === "Unemployed" ? 'invisible h-0' : 'visible grid justify-items-center')}>
                                <p className="text-gray-800 font-bold">Position:</p>
                                <p className="text-gray-800 text-sm">{user.position}</p>
                            </div>
                        </div>

                </div>
            ))}

        </div>
    );
};

export default Usuario;