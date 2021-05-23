import React from 'react';
import { useDropzone } from 'react-dropzone';
import { processReddit } from './index';
import { COMPANIES } from '../../globals';

interface Props {
  selectedCompany: string;
}

const DataDropzone = ({ selectedCompany }: Props) => {
  // TODO: process actual zipped files
  const handleData = (acceptedFiles: Array<File>) => {
    switch (selectedCompany) {
      case COMPANIES.REDDIT.name:
        processReddit(acceptedFiles);
        break;
      default:
        break;
    }
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
        <p>Drag &apos;n&apos; drop some files here, or click to select files</p>
      </div>
    </div>
  );
};

export default DataDropzone;
