import React from "react";
import "./delete.css";

function DeleteFile({ visible, setShowModel, showModel,deleteData }) {
  if (!visible) return null;
  const okk = () => {
    setShowModel(!showModel);
  };
  
  return (
    <div id="main-container">
      <div className="short-container">
        <img src="delete.png" alt="logo" />
        <p className="Delete">Delete Contacts</p>
        <p className="p-tag">Sure you want delete this Contacts ?</p>
        <div className="buttons">
          <button className="cancel" onClick={okk}>
            CANCEL
          </button>
          <button onClick={deleteData} className="ok">
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteFile;
