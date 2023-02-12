import FirebaseStorageService from './FirebaseStorage';

export default function handleCancelImageClick(
  imageUrl: string,
  setFileInputRef: (value: any) => void,
  setImageUrl: (value: string) => void,
  setUploadProgress: (value: number) => void,
) {
  FirebaseStorageService.deleteFile(imageUrl);
  setFileInputRef(null);
  setImageUrl('');
  setUploadProgress(-1);
}
