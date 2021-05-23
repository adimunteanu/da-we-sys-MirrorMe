import JSZip from 'jszip';
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

const DataDropzone = () => {
  const [fileNames, setFileNames] = useState<Array<string>>([]);

  // TODO: process actual zipped files
  const handleData = (acceptedFiles: Array<File>) => {
    const zip = new JSZip();
    zip
      .loadAsync(acceptedFiles[0])
      .then(
        (zipped) => {
          zipped.forEach(async (_, file) => {
            const currentFile = await file.async('text');
            console.log(currentFile);
          });
          return null;
        },
        () => {
          throw new Error('Invalid format');
        }
      )
      .catch((err) => console.log(err));
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    // TODO: change accepted types to actual types
    accept: 'application/zip',
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
