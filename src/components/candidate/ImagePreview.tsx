import React from "react";

const ImagePreview = ({ file }) => {
    const [preview, setPreview] = React.useState(null);
    const reader = new FileReader();

  reader.readAsDataURL(file);
  reader.onload = () => {
    setPreview(reader.result);
  };


    return <div className='bg-gray-400 w-min rounded-lg pt-3'>
        {preview ? <embed className='mx-3' src={preview} type="application/pdf" width="183px" height="236" /> : "Loading..."}
        <p className='pl-1 py-2 flex mx-2'>File: {file.name}</p>
    </div>;
};

export default ImagePreview;
