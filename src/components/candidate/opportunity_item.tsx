import React from 'react';
import Modal from '../modal';
import Link from "next/link";
import { string } from 'zod';

interface Props { 
    id: string;
    name: string;
    amount: number;
    date: string;
    // primTech: string;
    // secTech: string;
    icon: string;
    // location: string;
    description: string;
    modality: string;
    position: string;
    workTime: number;
    // skills: string[];
}

const OpportunityItem: React.FC<Props> = ({id, name, amount, date, icon, description, modality, position, workTime,}) => { //Faltan primTech, secTech, location, skills
    const [modalOpen, setModalOpen] = React.useState(false);
    
    return (
        <>
            <li key={id}>
                <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer rounded-lg mt-5 p-2 flex">
                    <button className="flex" onClick={() => setModalOpen(true)}>
                        {/* Insertar Iconos */}
                        <div className='bg-[#47d7ac] rounded-lg p-3 my-auto'>
                            <img src={(icon)} alt="icon" className="h-6 w-6" />
                        </div>
                        {/* Widget*/}
                        <div className="flex justify-between">
                            <div className="px-4 w-52 grid justify-items-start">
                                <p className="text-gray-800 font-bold">{name}</p>
                                <p className="lg:flex md:hidden sm:hidden text-sm my-auto">Published: {date}</p>
                            </div>
                        </div>
                    </button> 
                    <Link className='my-auto' href={"/candidate/apply/" + id}>
                        <button
                        className={(amount >= 15 ? 'p-3 rounded-lg hover:bg-green-400 bg-green-300 my-auto ml-3 text-sm font-bold' :
                        amount > 0 ? 'p-3 rounded-lg hover:bg-yellow-400 bg-yellow-300 my-auto ml-3 text-sm font-bold' : 
                        'invisible h-0 w-0')}>
                            Apply
                        </button>
                    </Link>
                </div>
            </li>
            {modalOpen && (
                <Modal  isOpen={modalOpen} onClose={() => setModalOpen(false)} children={
                    <>
                        <div className="bg-gray-300 w-auto rounded-lg p-2">
                            <div className='p-2 flex justify-start'>
                                <img src={(icon)} alt="icon" className="h-10 w-10 my-auto"/>
                                <p className="text-gray-800 font-bold p-2 text-2xl">{name}</p>
                            </div>
                            <div className='p-2 flex justify-start'>
                                <div className='px-1'>
                                    <p className="text-gray-800 font-bold pr-2">Status:</p>
                                    <div className={(amount === 0 ? 'p-1 rounded-lg bg-red-400 w-fit h-fit my-auto' : 
                                        amount >= 15 ? 'invisible h-0' :
                                        amount < 15 ? 'invisible h-0' : 'invisible h-0 w-0')}>
                                            <p className="text-gray-800 text-sm">Closed</p>
                                    </div>
                                    <div className={(amount === 0 ? 'invisible h-0' : 
                                        amount >= 15 ? 'p-1 rounded-lg bg-green-400 w-fit h-fit my-auto' :
                                        amount < 15 ? 'invisible h-0' : 'invisible h-0 w-0')}>
                                            <p className="text-gray-800 text-sm">Open</p>
                                    </div>
                                    <div className={(amount === 0 ? 'invisible h-0' : 
                                        amount >= 15 ? 'invisible h-0' :
                                        amount < 15 ? 'p-1 rounded-lg bg-yellow-400 w-fit h-fit my-auto' : 'invisible h-0 w-0')}>
                                            <p className="text-gray-800 text-sm">Restricted</p>
                                    </div>
                                </div>
                            </div>
                            <div className='p-2 flex justify-between'>
                                <div className='px-1'>
                                    <p className="text-gray-800 font-bold">Location:</p>
                                    <p className="text-gray-800">{}</p>
                                </div>
                                <div className='px-1'>
                                    <p className="text-gray-800 font-bold">Hours per Week:</p>
                                    <p className="text-gray-800">{workTime} hrs</p>
                                </div>
                                <div className='px-1'>
                                    <p className="text-gray-800 font-bold">Modality:</p>
                                    <p className="text-gray-800">{modality}</p>
                                </div>
                                <div className='px-1'>
                                    <p className="text-gray-800 font-bold">Position:</p>
                                    <p className="text-gray-800">{position}</p>
                                </div>
                                <div className='px-1'>
                                    <p className="text-gray-800 font-bold">Main Technology:</p>
                                    <p className="text-gray-800">{}</p>
                                </div>
                                <div className='px-1'>
                                    <p className="text-gray-800 font-bold">Published:</p>
                                    <p className="text-gray-800">{date}</p>
                                </div>
                            </div>
                            <div className='p-2'>
                                <p className="text-gray-800 font-bold">Description:</p>
                                <p className="text-gray-800 pl-2">{description}</p>
                            </div>
                            <div className='p-2'>
                                <p className="text-gray-800 font-bold">Skills:</p>
                                <ul className='flex justify-start'>
                                    {/* {skills.map((skill) => (
                                        <p className='text-gray-800 bg-blue-400 rounded-lg p-0.5 mx-1 capitalize'>{skill}</p>
                                    ))} */}
                                </ul>
                            </div>
                            <div className='p-2 flex justify-center'>
                                <Link className='w-full' href={"/candidate/apply/" + id}>
                                    <button 
                                    className={(amount >= 15 ? 'p-3 rounded-lg hover:bg-[#0f172a] bg-[#47d7ac] my-auto ml-3 hover:text-white text-sm font-bold  w-full' : 
                                    amount > 0 ? 'p-3 rounded-lg hover:bg-[#0f172a] bg-[#47d7ac] my-auto ml-2 hover:text-white text-sm font-bold  w-full' : 
                                    'invisible h-0')}>Apply
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </>
                }/>
            )}
        </>
    );
};

export default OpportunityItem;