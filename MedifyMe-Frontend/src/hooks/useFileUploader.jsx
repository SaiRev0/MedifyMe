import { useState } from "react";
import { toast } from "react-toastify";

const useFileUploader = (maxFileCount) => {
  const [files, setFiles] = useState([]);

  const validFileTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "application/pdf",
  ];

  const maxFileSize = 5 * 1024 * 1024; // 5 MB
  const maxFileSizeMB = 5;

  const handleFileChange = (event) => {
    const files = event.target.files;

    if (files.length > maxFileCount) {
      toast.error(`You can upload up to ${maxFileCount} files`);
      event.target.value = null;
    }

    let filteredFiles = Array.from(files).filter((file) => {
      const isValidFileType = validFileTypes.includes(file.type);
      const isUnderMaxFileSize = file.size <= maxFileSize;
      if (!isValidFileType) {
        toast.error(
          `File type ${file.type} is not allowed. Please upload only JPG, JPEG, PNG, or PDF files. Your file will not be saved`
        );
      } else if (!isUnderMaxFileSize) {
        toast.error(
          `File ${file.name} is too large. Please upload files that are smaller than ${maxFileSizeMB} MB. Your file will not be saved`
        );
      } else {
        return true;
      }
      return false;
    });

    if (filteredFiles.length > maxFileCount) {
      toast.error(
        `You can upload up to ${maxFileCount} files. Only the first ${maxFileCount} files will be saved`
      );
      filteredFiles = filteredFiles.slice(0, maxFileCount);
    }
    setFiles(filteredFiles);
  };
  return [files, handleFileChange];
};

export default useFileUploader;
