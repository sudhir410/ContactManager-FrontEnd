import React from "react";
import "./delete2.css";

function DeletedFile({ visible, setafterDelete }) {
  if (!visible) return null;
  const handleOnClose = () => {
    setafterDelete(false);
  };

  return (
    <div id="main-container" onClick={handleOnClose}>
      <div className="short-container">
        <img className="img" src="delete2.png" alt="logo" />
      </div>
    </div>
  );
}

export default DeletedFile;
