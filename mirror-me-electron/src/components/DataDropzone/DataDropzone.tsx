import React from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch } from 'react-redux';
import { processFacebook, processInstagram, processReddit } from './index';
import { COMPANIES } from '../../globals';
import {
  CompanyRelevantData,
  FacebookRelevantData,
  RedditRelevantData,
} from '../../types';
import {
  updateCanUpload,
  updateIsUploadingFiles,
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
    dispatch(updateIsUploadingFiles(true));
    let company = '';
    switch (selectedCompany) {
      case COMPANIES.REDDIT.name:
        relevantData = processReddit(acceptedFiles);
        company = COMPANIES.REDDIT.name;
        break;
      case COMPANIES.INSTAGRAM.name:
        relevantData = processInstagram(acceptedFiles);
        company = COMPANIES.INSTAGRAM.name;
        break;
      case COMPANIES.FACEBOOK.name:
        relevantData = processFacebook(acceptedFiles);
        company = COMPANIES.FACEBOOK.name;
        break;
      default:
        relevantData = processReddit(acceptedFiles);
        break;
    }

    await relevantData.then((data) => {
      if (COMPANIES.REDDIT.name === company) {
        const redditData = data as RedditRelevantData;
        redditData.contributions.messages = redditData.contributions.messages.filter(
          (message) => message.from === redditData.account[0]
        );
      } else if (COMPANIES.FACEBOOK.name === company) {
        const facebookData = data as FacebookRelevantData;
        facebookData.contributions.messages = facebookData.contributions.messages.filter(
          (message) => message.sender === facebookData.account[0]
        );
      }

      dispatch(updateStringifiedData(JSON.stringify(data)));
      dispatch(updateCanUpload(true));
      dispatch(updateIsUploadingFiles(false));
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
