import React, { useState } from 'react';
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
import styles from './DocumentPreview.module.css';

function DocumentPreview({ fileUrl }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const isPdf = fileUrl.toLowerCase().endsWith('.pdf');

  
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <>
      <div className={styles.previewContainer} onClick={handleOpenModal}>
        {isPdf ? (
          <div className={styles.pdfPreview}>
            <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess}>
              <Page pageNumber={1} width={100} height={100} />
            </Document>
          </div>
        ) : (
          <img src={fileUrl} alt={fileUrl} className={styles.imgPreview} />
        )}
      </div>  
      {modalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <button className={styles.closeButton} onClick={handleCloseModal}>
              X
            </button>
            <div className={styles.modalContent}>
              {isPdf ? (
                <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess}>
                  <Page pageNumber={pageNumber} />
                </Document>
              ) : (
                <img src={fileUrl} alt={fileUrl} />
              )}
              {isPdf && (
                <p className={styles.pageNumber}>
                  Page {pageNumber} of {numPages}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DocumentPreview;
