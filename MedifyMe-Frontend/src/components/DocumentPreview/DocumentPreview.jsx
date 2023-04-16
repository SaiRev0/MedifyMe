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
  const pdfPageRefs = useRef([]);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handlePageNumberChange = (event) => {
    setPageNumber(parseInt(event.target.value, 10));
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

        if (canvas) {
          const canvasContext = canvas.getContext("2d");
          const viewport = page.getViewport({ scale: 1 });

          const scaleFactor = Math.min(
            canvas.width / viewport.width,
            canvas.height / viewport.height
          );

          const scaledViewport = page.getViewport({ scale: scaleFactor });
          
          canvas.width = 1000;
          canvas.height =
            scaledViewport.height * (canvas.width / scaledViewport.width);

          const renderContext = {
            canvasContext,
            viewport: scaledViewport,
          };
          await page.render(renderContext).promise;
        }
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
                <div className={styles.pdfModalContent}>
                  <div className={styles.pdfModalPages}>
                    <canvas ref={canvasRef} width={100} className={styles.pdfModalPage} />
                  </div>
                  <div className={styles.pdfModalControls}>
                    <input
                      type="number"
                      min={1}
                      max={numPages}
                      value={pageNumber}
                      onChange={handlePageNumberChange}
                      className={styles.pageNumberInput}
                    />
                    <span className={styles.pageNumberSeparator}>/</span>
                    <span className={styles.pageNumberTotal}>{numPages}</span>
                  </div>
                </div>
              ) : (
                <img
                  src={fileUrl}
                  alt={fileUrl}
                  className={styles.imgModalContent}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DocumentPreview;
