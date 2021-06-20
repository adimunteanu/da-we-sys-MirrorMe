import React from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch } from 'react-redux';
import { processInstagram, processReddit } from './index';
import { COMPANIES } from '../../globals';
import { CompanyRelevantData, RedditRelevantData } from '../../types';
import {
  updateCanUpload,
  updateStringifiedData,
} from '../../pages/OverviewPage/dataSlice';

interface Props {
  selectedCompany: string;
}

const DataDropzone = ({ selectedCompany }: Props) => {
  const dispatch = useDispatch();
  const handleData = async (acceptedFiles: Array<File>) => {
    let relevantData: Promise<CompanyRelevantData>;
    dispatch(updateCanUpload(false));

    switch (selectedCompany) {
      case COMPANIES.REDDIT.name:
        relevantData = processReddit(acceptedFiles);
        break;
      case COMPANIES.INSTAGRAM.name:
        relevantData = processInstagram(acceptedFiles);
        break;
      default:
        relevantData = processReddit(acceptedFiles);
        break;
    }

    await relevantData.then((data) => {
      if ('account' in data) {
        const redditData = data as RedditRelevantData;
        redditData.contributions.messages = redditData.contributions.messages.filter(
          (message) => message.from === redditData.account[0]
        );
      }

      dispatch(updateStringifiedData(JSON.stringify(data)));
      dispatch(updateCanUpload(true));
      return JSON.stringify(data);
    });
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
