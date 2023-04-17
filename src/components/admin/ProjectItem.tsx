import Link from "next/link";

interface Props {
  name: string;
  department: string;
  progress: number;
  id: string;
}

const ProjectItem = ({ id, name, department, progress }: Props) => {
  return (
    <div className="m-4 flex min-w-full flex-col rounded-lg bg-white p-4 shadow-lg">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <Link
            className="text-xl font-bold hover:underline"
            href={`/admin/project/${id}`}
          >
            {name}
          </Link>
          <p className="text-sm">{department}</p>
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
    </div>
  );
};

export default ProjectItem;
