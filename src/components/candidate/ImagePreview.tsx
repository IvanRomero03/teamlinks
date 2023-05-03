import React from "react";

const ImagePreview = ({ file }: { file: Blob }) => {
  const [preview, setPreview] = React.useState<string | ArrayBuffer | null>(
    null
  );
  const reader = new FileReader();

  reader.readAsDataURL(file);
  reader.onload = () => {
    setPreview(reader.result);
  };

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
};

export default ImagePreview;
