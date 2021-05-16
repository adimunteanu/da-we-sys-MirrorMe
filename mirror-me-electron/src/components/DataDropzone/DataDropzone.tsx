import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

const DataDropzone = () => {
  const [fileNames, setFileNames] = useState<Array<string>>([]);

  // TODO: process actual zipped files
  const handleData = (acceptedFiles: Array<File>) => {
    setFileNames(acceptedFiles.map((file) => file.name));
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    // TODO: change accepted types to actual types
    accept: 'image/*',
    onDrop: (acceptedFiles) => handleData(acceptedFiles),
  });

  return (
    <div className="container">
      <div
        {...getRootProps({
          className: `Dropzone ${isDragActive ? 'Dropzone--active' : ''} ${
            isDragAccept ? 'Dropzone--accept' : ''
          } ${isDragReject ? 'Dropzone--reject' : ''}`,
        })}
      >
        <input {...getInputProps()} />
        <p>
          {fileNames.length > 0
            ? fileNames.join(', ')
            : "Drag 'n' drop some files here, or click to select files"}
        </p>
      </div>
    </div>
  );
};

export default DataDropzone;
