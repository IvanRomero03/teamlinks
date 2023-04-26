import React from 'react';

const ImagePreview = ({file}) => {
    const [preview, setPreview] = React.useState(null);
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
        setPreview(reader.result);
    };


    return <div>
        {preview ? <embed src={preview} type="application/pdf" width="200px" height="200px"/> : "Loading..."}
    </div>;
};

export default ImagePreview;