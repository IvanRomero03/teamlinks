import React from 'react';

interface Props { 
    id: number;
    name: string;
    status: string;
    date: string;
    primTech: string;
    secTech: string;
    icon: string;
    description: string;
}

const OpportunityItem: React.FC<Props> = ({id, name, status, date, primTech, secTech, icon, description}) => {
    const [collapseOpen, setCollapseOpen] = React.useState(false);
    return (
        <>
            <li key={id}>
                <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer rounded-lg mt-5 p-2 flex">
                    <button className="flex" onClick={() => setCollapseOpen(!collapseOpen)}>
                        {/* Insertar Iconos */}
                        <div className='bg-[#47d7ac] rounded-lg p-3'>
                            <img src={(icon)} alt="icon" className="h-6 w-6" />
                        </div>
                        {/* Widget*/}
                        <div className="flex justify-between">
                            <div className="pl-4 w-52 grid justify-items-start">
                                <p className="text-gray-800 font-bold">{name}</p>
                                <p className="lg:flex md:hidden sm:hidden text-sm my-auto">Published: {date}</p>
                            </div>
                            <p className="pr-2 lg:flex md:hidden sm:hidden pl-4 text-gray-800 text-sm my-auto w-36">Main Technology: {primTech}</p>
                            <div className={(status === 'Closed' ? 'p-1 rounded-lg bg-red-400 w-fit h-fit my-auto' : 
                            status === 'Available' ? 'p-1 rounded-lg bg-green-400 w-fit h-fit my-auto' :
                            status === 'Restricted' ? 'p-1 rounded-lg bg-yellow-400 w-fit h-fit my-auto' : 'invisible h-0 w-0')}>
                                <p className="text-gray-800 text-sm">{status}</p>
                            </div>
                        </div>
                    </button> 
                    <button 
                    className={(status === 'Available' ? 'p-3 rounded-lg hover:bg-[#0f172a] bg-[#47d7ac] my-auto ml-3 hover:text-white text-sm font-bold' :
                    status === 'Restricted' ? 'p-3 rounded-lg hover:bg-[#0f172a] bg-[#47d7ac] my-auto ml-2 hover:text-white text-sm font-bold' : 'invisible h-0')}>
                        Apply
                    </button>
                </div>
                {collapseOpen && (
                    <div className="bg-gray-300 max-w-prose rounded-lg p-2">
                        <p className="pr-2 lg:flex md:hidden sm:hidden text-gray-800 text-sm font-bold">Description:</p>
                        <p className="pl-2 lg:flex md:hidden sm:hidden text-sm my-auto">{description}</p>
                    </div>
                )}
            </li>
        </>
    );
}

export default OpportunityItem;