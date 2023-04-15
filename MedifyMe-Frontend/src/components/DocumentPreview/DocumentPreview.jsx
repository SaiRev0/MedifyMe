import React, { useState, useEffect, useRef } from "react";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import "pdfjs-dist/build/pdf.worker";
import styles from "./DocumentPreview.module.css";

function DocumentPreview({ fileUrl }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const isPdf = fileUrl.toLowerCase().endsWith(".pdf");
  const canvasRef = useRef(null);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };
  useEffect(() => {
    const loadPdf = async () => {
      try {
        pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;
        const loadingTask = pdfjsLib.getDocument({ url: fileUrl });
        const pdf = await loadingTask.promise;
        setNumPages(pdf.numPages);
        const page = await pdf.getPage(pageNumber);
        const canvas = canvasRef.current;
        const canvasContext = canvas.getContext("2d");

        const viewport = page.getViewport({ scale: 1 });
        canvas.width = 100; // Set canvas width to 100 pixels
        canvas.height = "auto";
        const renderContext = {
          canvasContext,
          viewport,
        };
        await page.render(renderContext).promise;
      } catch (error) {
        console.error("Failed to load PDF:", error);
      }
    };

    if (isPdf) {
      loadPdf();
    }
  }, [fileUrl, pageNumber, isPdf]);

  return (
    <>
      <div className={styles.previewContainer} onClick={handleOpenModal}>
        {isPdf ? (
          <div className={styles.pdfPreview}>
            <canvas ref={canvasRef} className={styles.previewDoc} />
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
                <canvas ref={canvasRef} />
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
