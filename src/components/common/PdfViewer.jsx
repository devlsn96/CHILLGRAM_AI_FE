import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

// worker 설정 (필수)
// pdfjs.version이 제대로 로드되지 않는 경우를 대비해 하드코딩하거나,
// 일반적으로는 `pdfjs.GlobalWorkerOptions.workerSrc`를 설정합니다.
// Vite 환경에서는 아래와 같이 설정하는 것이 일반적입니다.
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

export default function PdfViewer({ pdfUrl }) {
  const [numPages, setNumPages] = useState(null);
  const [containerWidth, setContainerWidth] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div
      className="flex flex-col items-center bg-gray-100 p-4 rounded-xl w-full"
      ref={(el) => {
        if (el) {
          setContainerWidth(el.clientWidth - 32); // padding 고려
        }
      }}
    >
      <Document
        file={pdfUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        loading={
          <div className="flex flex-col items-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-gray-500 font-bold">
              PDF 문서를 불러오는 중입니다...
            </p>
          </div>
        }
        error={
          <div className="flex flex-col items-center py-20 text-red-500">
            <p className="font-bold text-lg mb-2">문서를 불러올 수 없습니다.</p>
            <p className="text-sm">
              파일이 손상되었거나 형식이 올바르지 않습니다.
            </p>
          </div>
        }
        className="flex flex-col gap-4 w-full items-center"
      >
        {numPages &&
          Array.from(new Array(numPages), (el, index) => (
            <div key={`page_${index + 1}`} className="shadow-lg bg-white">
              <Page
                pageNumber={index + 1}
                width={containerWidth ? Math.min(containerWidth, 800) : 600}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            </div>
          ))}
      </Document>
    </div>
  );
}
