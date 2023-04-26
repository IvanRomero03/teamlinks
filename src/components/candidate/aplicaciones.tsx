import React from "react";
import {data} from "./data/application_data.js"


const Aplicaciones = () => {
    return(
        <>
            <div className="w-auto col-span-1 relative lg:h-[70vh] h-[50vh] m-auto p-4 
            border rounded-lg bg-white overflow-auto">
                <h1 className="font-bold">Applications</h1>
                <ul>
                    {data.map((application, id) => (
                        <li key={id}
                        className="bg-gray-100 hover:bg-gray-200 rounded-lg my-3 p-2 cursor-pointer flex"
                        >
                            {/* Insertar Iconos */}
                            <div className='bg-[#47d7ac] rounded-lg p-3'>
                                <img src={(application.icon)} alt="icon" className="h-6 w-6" />
                            </div>
                            {/* Widget*/}
                            <div className="flex justify-between">
                                <div className="pl-4 w-52">
                                    <p className="text-gray-800 font-bold">{application.name}</p>
                                    <div className={(application.status === 'Not Selected' ? 'p-1 rounded-lg bg-red-300 w-fit' : 
                                    application.status === 'Selected' ? 'p-1 rounded-lg bg-green-300 w-fit' :
                                    application.status === 'Under Consideration' ? 'p-1 rounded-lg bg-yellow-300 w-fit' : 'invisible h-0')}>
                                        <p className="text-gray-800 text-sm">Status: {application.status}</p>
                                    </div>
                                </div>
                                <p className="pr-2 lg:flex md:hidden sm:hidden pl-4 text-gray-800 text-sm my-auto w-36">Main Technology: {application.primTech}</p>
                                <p className="pl-2 lg:flex md:hidden sm:hidden text-sm my-auto w-20">{application.date}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default Aplicaciones;