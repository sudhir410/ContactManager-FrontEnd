import React from "react";
import "./imported.css";

function ImportedFile({ visible, setimportDone }) {
  if (!visible) return null;
  const handleClose = () => {
    setimportDone(false);
  };
  return (
    <div id="main-container" onClick={() => handleClose()}>
      <div className="short-container">
        <img src="imported.png" alt="logo" />
        <p className="import">Import Completed</p>
        <p className="p-tag">CSV File is Uploaded</p>
      </div>
    </div>
  );
}
export default ImportedFile;
