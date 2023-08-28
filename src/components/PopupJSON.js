import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import styles from "../app/popup.module.css";
import readXlsxFile from "read-excel-file";

const PopupJSON = ({ handlerParams }) => {
  const [count, setCount] = useState(0);

  const acceptedFileTypes = ".xls,.xlsx";
  const [loading, setLoading] = useState(false);
  const [jsonData, setJsonData] = useState(null);
  const [isOpen, setIsOpen] = useState(true);

  const onDrop = async (acceptedFiles) => {
    setLoading(true);
    const file = acceptedFiles[0];

    try {
      const jsonData = await readXlsxFile(file);
      setJsonData(jsonData);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao ler o arquivo Excel:", error);
      setLoading(false);
    }
  };

  const handleDownload = () => {
    setIsOpen(false);
    setJsonData(null);
  };

  const handleCopyToClipboard = () => {
    if (jsonData) {
      const jsonString = JSON.stringify(jsonData, null, 2);
      navigator.clipboard.writeText(jsonString).then(() => {
        alert("Dados copiados para o Clipboard!");
      });
    }
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
          {jsonData && (
            <div>
              <h3>Dados convertidos para JSON:</h3>
              <textarea
              className={styles.apresentacao}
                value={JSON.stringify(jsonData, null, 2)}
                readOnly
                rows={10} // Defina o número de linhas desejado
                cols={40} // Defina o número de colunas desejado
              />

              <div className={styles.downloadButtonDiv}>
                <button className={styles.downloadButton} onClick={handleCopyToClipboard}>
                  Copiar para Clipboard
                </button>
                <button className={styles.downloadButton} onClick={handleDownload}>Fechar</button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default PopupJSON;
