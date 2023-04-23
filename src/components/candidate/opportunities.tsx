import React from "react";
import OpportunityItem from "y/components/candidate/opportunity_item";
import { api } from "y/utils/api";

const Opportunidades = () => {
    const {data, error} = api.candidateRouter.getOpportuninties.useQuery();
    const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

    return(
        <>
            <div className="col-span-1 relative lg:h-[70vh] h-[50vh] m-auto p-4 
            border rounded-lg bg-white overflow-auto">
                <h1 className="font-bold">Opportunities</h1>
                <ul>
                    {data?.map((opportunity, id) => (
                        <OpportunityItem 
                            date={String(opportunity.fechaCreacion.getDate()) + "/" + month[opportunity.fechaCreacion.getMonth()] + "/" + String(opportunity.fechaCreacion.getFullYear())}
                            id={opportunity.id}
                            icon={"images/icons/css.png"}
                            name={opportunity.jobTitle}
                            // primTech={opportunity.mustHaves[0]?.name || ""}
                            // secTech={opportunity.mustHaves[1]?.name || ""}
                            amount={opportunity.numPosicionesDisponibles}
                            description={opportunity.descripcion}
                            // location={opportunity.proyecto.pais}
                            modality={opportunity.tipo}
                            position={opportunity.estatus === "Open" ? "Open" : "Closed"}
                            key={id}
                            workTime={20}
                            // skills={opportunity.mustHaves.map((skill) => skill.name)}
                        />
                    ))}
                </ul>
            </div>
        </>
    );
};

export default Opportunidades;