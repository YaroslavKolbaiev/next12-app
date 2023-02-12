import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { storage } from './FireBaseConfig';

const uploadFile = async (file: any, fullFilePath: string, progressCallback: any) => {
  const uploadRef = ref(storage, fullFilePath);
  const uploadTask = uploadBytesResumable(uploadRef, file);

  uploadTask.on(
    'state_changed',
    (snapshot) => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
      );
      progressCallback(progress);
    },
    (error) => {
      throw error;
    },
  );

  return uploadTask.then(async () => {
    const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);

    return downloadUrl;
  });
};

const deleteFile = (fileDownloadUrl: string) => {
  const decodeUrl = decodeURIComponent(fileDownloadUrl);
  const startIndex = decodeUrl.indexOf('/o/') + 3;
  const endIndex = decodeUrl.indexOf('?');
  const filePath = decodeUrl.substring(startIndex, endIndex);

  const fileRef = ref(storage, filePath);
  return deleteObject(fileRef);
};

const FirebaseStorageService = {
  uploadFile,
  deleteFile,
};

export default FirebaseStorageService;
