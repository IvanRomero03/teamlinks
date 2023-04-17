
import Link from "next/link";
interface Props {
    nameM: string;
    id: string;
    project:string;
    progress: number;
    recruiters: string;
  }

const Manager = ({nameM,id,project,progress,recruiters}: Props) =>{
    return(
        <div className="b-2 flex-col space-y-4 rounded-md border-white bg-white p-4 text-center shadow-md">
      <Link
            className="text-xl font-bold hover:underline"
            href={`/ADMINISTRATOR/${id}`}
          >
            {nameM}
          </Link>
      
      <p className="text-xl font-bold hover:underline">Proyecto: {project}</p>
      <div className="flex min-w-full flex-col">
        <div className="h-2 w-20 min-w-full justify-center rounded-full bg-gray-200">
          <div
            className="h-full rounded-full"
            style={{
              width: `${progress}%`,

              backgroundColor: progress < 50 ? "#F56565" : "#FFA500",
              
            }}
          />
        </div>
        <p className="text-sm">{progress}%</p>
        <p className="text-sm font-bold" > Recruited: </p>
        <p>{recruiters}</p>
        <p>Notas:</p>
        
        
      </div>
    </div>

    );
}

//<img src="/images/warning_1.jpg" height="20"></img> <h1>Alto retrazo</h1>

export default Manager;