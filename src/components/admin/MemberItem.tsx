import { useState } from "react";

interface Props {
  name: string;
  category: string;
  proyects: string[];
  progress: number;
}

const MemberItem = ({ name, category, proyects, progress }: Props) => {
  const [proyectsOpen, setProyectsOpen] = useState(false);
  return (
    <div className="m-4 flex min-w-full flex-col rounded-lg bg-white p-4 shadow-lg">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <p className="text-xl font-bold hover:underline">{name}</p>
          <p className="text-sm">{category}</p>
        </div>
        <div className="flex flex-col">
          <div className="h-2 w-20 rounded-full bg-gray-200">
            <div
              className="h-full rounded-full"
              style={{
                width: `${progress}%`,
                backgroundColor: progress < 50 ? "#F56565" : "#68D391",
              }}
            />
          </div>
          <p className="text-sm">{progress}%</p>
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <p
          onClick={() => setProyectsOpen(!proyectsOpen)}
          className={
            "cursor-pointer " +
            (proyectsOpen ? "text-emerald-400 underline " : "hover:underline ")
          }
        >
          Proyectos {proyectsOpen ? "-" : "+"}
        </p>
      </div>
      {proyectsOpen && (
        <div className="flex flex-col">
          <ul>
            {proyects.map((proyect) => (
              <li className="ml-4 hover:underline" key={proyect}>
                {proyect}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MemberItem;
