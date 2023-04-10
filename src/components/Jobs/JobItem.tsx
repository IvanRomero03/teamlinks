import { useState } from "react";
import Link from "next/link";

interface Props {
  name: string;
  category: string;
  location: string;
  type: string;
  description: string;
}

const JobItem = ({ name, category, location, type, description }: Props) => {
  const [descriptionOpen, setDescriptionOpen] = useState(false);
  return (
    <div className="m-4 flex flex-col rounded-lg bg-white p-4 shadow-lg">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <Link
            href="/jobs/[id]"
            as={`/jobs/${name}`}
            className="text-xl font-bold hover:underline"
          >
            {name}
          </Link>
          <p className="text-sm">{category}</p>
          <p className="text-sm">{location}</p>
        </div>
        <div className="flex flex-col">
          <p className="text-sm">{type}</p>
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <p
          onClick={() => setDescriptionOpen(!descriptionOpen)}
          className={
            "cursor-pointer " +
            (descriptionOpen
              ? "text-emerald-400 underline "
              : "hover:underline ")
          }
        >
          Description {descriptionOpen ? "-" : "+"}
        </p>
      </div>
      {descriptionOpen && (
        <div className="flex flex-col">
          <p className="text-justify text-sm">{description}</p>
        </div>
      )}
    </div>
  );
};

export default JobItem;
