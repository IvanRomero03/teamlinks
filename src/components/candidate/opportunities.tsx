import React from "react";
import {data} from "./data/opportunity_data.js";
import OpportunityItem from "./opportunity_item";


const Opportunidades = () => {
    return(
        <>
            <div className="col-span-1 relative lg:h-[70vh] h-[50vh] m-auto p-4 
            border rounded-lg bg-white overflow-auto">
                <h1 className="font-bold">Opportunities</h1>
                <ul>
                    {data.map((opportunity, id) => (
                        <OpportunityItem 
                            date={opportunity.date}
                            id={opportunity.id}
                            icon={opportunity.icon}
                            name={opportunity.name}
                            primTech={opportunity.primTech}
                            secTech={opportunity.secTech}
                            status={opportunity.status}
                            description={opportunity.description}
                            key={id}
                        />
                    ))}
                </ul>
            </div>
        </>
    );
};

export default Opportunidades;