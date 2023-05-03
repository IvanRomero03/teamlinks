interface Props {
  name: string;
  progress: number;
}

const MemberSmall = ({ name, progress }: Props) => {
  return (
    <div className="b-2 max-w-xl flex-col space-y-4 rounded-md border-white bg-white p-4 text-center shadow-md">
      <p className="text-xl font-bold hover:underline">{name}</p>
      <div className="flex min-w-full flex-col">
        <div className="h-2 w-20 min-w-full justify-center rounded-full bg-gray-200">
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
  );
};

export default MemberSmall;
