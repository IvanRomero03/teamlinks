import React from "react";

<<<<<<< HEAD
const ImagePreview = ({ file }) => {
    const [preview, setPreview] = React.useState(null);
    const reader = new FileReader();
=======
const ImagePreview = ({ file }: { file: Blob }) => {
  const [preview, setPreview] = React.useState<string | ArrayBuffer | null>(
    null
  );
  const reader = new FileReader();
>>>>>>> 0c87c48a7ce69d6311310b6b576b55dc9bf2ce4f

  reader.readAsDataURL(file);
  reader.onload = () => {
    setPreview(reader.result);
  };

<<<<<<< HEAD

    return <div className='bg-gray-400 w-min rounded-lg pt-3'>
        {preview ? <embed className='mx-3' src={preview} type="application/pdf" width="183px" height="236" /> : "Loading..."}
        <p className='pl-1 py-2 flex mx-2'>File: {file.name}</p>
    </div>;
=======
  return (
    <div className="w-min justify-center rounded-lg bg-gray-400 pt-3 ">
      {preview ? (
        <embed
          className="mx-3"
          src={String(preview)}
          type="application/pdf"
          width="183px"
          height="236"
        />
      ) : (
        "Loading..."
      )}
      <p className="mx-2 flex py-2 pl-1">File: {file.name}</p>
    </div>
  );
>>>>>>> 0c87c48a7ce69d6311310b6b576b55dc9bf2ce4f
};

export default ImagePreview;
