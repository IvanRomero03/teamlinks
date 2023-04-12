import React from "react";
import {data} from "./data/opportunity_data.js"


const Opportunidades = () => {
    return(
        <div className="w-auto col-span-1 relative lg:h-[70vh] h-[50vh] m-auto p-4 
        border rounded-lg bg-white overflow-auto">
            <h1 className="font-bold">Opportunities</h1>
            <ul>
                {data.map((opportunity, id) => (
                    <li key={id}
                    className="bg-gray-100 hover:bg-gray-200 rounded-lg my-3 p-2 cursor-pointer flex"
                    >
                        {/* Insertar Iconos */}
                        <div className='bg-[#47d7ac] rounded-lg p-3'>
                            <img src={(opportunity.icon)} alt="icon" className="h-6 w-6" />
                        </div>
                        {/* Widget*/}
                        <div className="flex justify-between">
                            <div className="pl-4 w-52">
                                <p className="text-gray-800 font-bold">{opportunity.name}</p>
                                <p className="lg:flex md:hidden sm:hidden text-sm my-auto">Published: {opportunity.date}</p>
                            </div>
                            <p className="pr-2 lg:flex md:hidden sm:hidden pl-4 text-gray-800 text-sm my-auto w-36">Main Technology: {opportunity.primTech}</p>
                            <div className={(opportunity.status === 'Closed' ? 'p-1 rounded-lg bg-red-400 w-fit h-fit my-auto' : 
                            opportunity.status === 'Available' ? 'p-1 rounded-lg bg-green-400 w-fit h-fit my-auto' :
                            opportunity.status === 'Restricted' ? 'p-1 rounded-lg bg-yellow-400 w-fit h-fit my-auto' : 'invisible h-0 w-0')}>
                                <p className="text-gray-800 text-sm">{opportunity.status}</p>
                            </div>
                            <div className={(opportunity.status === 'Available' ? 'p-3 rounded-lg bg-blue-400 hover:bg-[#47d7ac] text- my-auto ml-3' :
                            opportunity.status === 'Restricted' ? 'p-3 rounded-lg bg-blue-400 hover:bg-[#47d7ac] text- my-auto ml-2' : 'invisible h-0')}>
                                <button className="text-sm font-bold">Apply</button>
                            </div>
                        </div>
                        
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Opportunidades;