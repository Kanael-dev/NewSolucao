import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import styles from "../app/popup.module.css";
import XLSX from "xlsx";

const PopupXLSX = ({ handlerParams }) => {
  const [loading, setLoading] = useState(false);
  const [jsonData, setJsonData] = useState(null);
  const [isOpen, setIsOpen] = useState(true);

  const onDrop = async (acceptedFiles) => {
    setLoading(true);
    const file = acceptedFiles[0];

    try {
      const reader = new FileReader();
      reader.onload = (event) => {
        const fileData = JSON.parse(event.target.result);
        setJsonData(fileData);
        setLoading(false);
      };
      reader.readAsText(file);
    } catch (error) {
      console.error("Erro ao ler o arquivo JSON:", error);
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (jsonData) {
      const ws = XLSX.utils.aoa_to_sheet(jsonData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      XLSX.writeFile(wb, "output.xlsx");
    }
    setIsOpen(false);
    setJsonData(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ".json",
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
                Arraste e solte um arquivo JSON aqui ou clique para selecionar
              </p>
            )}
          </div>
          {jsonData && (
            <div>
              <h3>Dados convertidos para JSON:</h3>
              <textarea
                className={styles.apresentacao}
                value={JSON.stringify(jsonData, null, 2)}
                readOnly
                rows={10}
                cols={40}
              />
              <div className={styles.downloadButtonDiv}>
                <button
                  className={styles.downloadButton}
                  onClick={handleDownload}
                >
                  Baixar XLSX
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default PopupXLSX;
