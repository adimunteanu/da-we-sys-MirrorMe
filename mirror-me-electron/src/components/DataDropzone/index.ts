import JSZip from 'jszip';
import { readString } from 'react-papaparse';

export const processReddit = (acceptedFiles: Array<File>) => {
  const zip = new JSZip();
  zip
    .loadAsync(acceptedFiles[0])
    .then(
      (zipped) => {
        zipped.forEach(async (_, file) => {
          const currentFile = await file.async('text');
          const json = readString(currentFile, { header: true });
        });
        return null;
      },
      () => {
        throw new Error('Invalid format');
      }
    )
    .catch((err) => console.log(err));
};

export default '';
