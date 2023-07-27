import React from "react";

export default function DynamicAlertButton({ text }) {
  const handleButtonClick = () => {
    alert(`Você clicou no botão "${text}"`);
  };

  return (
    <button className="btnInformacoes" onClick={handleButtonClick}>
      {text}
    </button>
  );
}
