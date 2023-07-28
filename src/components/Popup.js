import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import styles from "../app/popup.module.css";
import Papa from "papaparse";
import readXlsxFile from "read-excel-file";

const Popup = ({ handlerParams }) => {
  const acceptedFileTypes = ".xls,.xlsx";
  const [loading, setLoading] = useState(false);
  const [csvData, setCsvData] = useState(null);
  const [isOpen, setIsOpen] = useState(true);

  const onDrop = async (acceptedFiles) => {
    setLoading(true);
    const file = acceptedFiles[0];

    try {
      const jsonData = await readXlsxFile(file);
      const csvData = Papa.unparse(jsonData);
      setCsvData(csvData);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao ler o arquivo Excel:", error);
      setLoading(false);
    }
  };

  const handleDownload = () => {
    setIsOpen(false);
    setCsvData(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes,
  });

  return (
    <>
      {isOpen && (
        <div className={styles.popupContainer}>
          <div className={styles.fecharItem} onClick={() => handlerParams(0)}>
            x
          </div>

          <div
            {...getRootProps()}
            className={`${styles.dropzone} ${
              isDragActive ? styles.active : ""
            }`}
          >
            <input {...getInputProps()} />
            {loading ? (
              <p>Carregando...</p>
            ) : isDragActive ? (
              <p>Solte o arquivo aqui...</p>
            ) : (
              <p>
                Arraste e solte um arquivo Excel aqui ou clique para selecionar
              </p>
            )}
          </div>
          <div className={styles.containerDownload}>
            {csvData && (
              <a
                className={styles.downloadButton}
                href={`data:text/csv;charset=utf-8,${encodeURIComponent(
                  csvData
                )}`}
                download="BASE_UCS.csv"
                onClick={handleDownload}
              >
                Baixar CSV
              </a>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;
