import { Puestos } from "@prisma/client";
import Link from "next/link";

const PositionItem = ({ position }: { position: Puestos }) => {
  return (
    <div className="m-2 flex flex-col space-y-4 rounded-md border-white bg-white p-4 text-center shadow-md">
      <div className="flex flex-col justify-between space-y-4">
        <Link
          href={`/admin/position/${position.id}`}
          className="text-xl font-bold hover:underline"
        >
          {position.jobTitle}
        </Link>
        {/** Progress Bar with  (numPosicionesDisponibles / numPosiciones) * 100 */}
        <div className="flex min-w-full flex-col">
          <div className="h-2 w-20 min-w-full justify-center rounded-full bg-gray-200">
            <div
              className="h-full rounded-full"
              style={{
                width: `${
                  (position.numPosicionesDisponibles / position.numPosiciones) *
                  100
                }%`,
                backgroundColor:
                  position.numPosicionesDisponibles / position.numPosiciones <
                  0.5
                    ? "#F56565"
                    : "#68D391",
              }}
            />
            <p className="text-sm">
              {(position.numPosicionesDisponibles / position.numPosiciones) *
                100}
              %
            </p>
          </div>
        </div>
        <p className="text-md">{position.Genus}</p>
      </div>
    </div>
  );
};

export default PositionItem;
