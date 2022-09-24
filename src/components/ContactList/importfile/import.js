import React, { useState } from "react";
import { Upload } from "antd";
import "./import.css";

function ImportFile({
  visible,
  onClose,
  setShowMyModel,
  setren,
  ren,
  setimportDone,
}) {
  const [importData, setImportData] = useState({});

  if (!visible) return null;

  const processCSV = (str, delim = ",") => {
    // console.log(str);
    const headers = str.slice(0, str.indexOf("\n")).trim().split(delim);
    const rows = str
      .slice(str.indexOf("\n") + 1)

      .split("\n");
    const Arrey = rows.map((row) => {
      const values = row.trim().split(delim);
      const eachObj = headers.reduce((obj, header, i) => {
        obj[header.toLowerCase()] = values[i];
        return obj;
      }, {});
      return eachObj;
    });
    Arrey.pop();
    console.log(Arrey);
    return Arrey;
  };

  const submitData = (e) => {
    e.preventDefault();
    setShowMyModel(false);
    const file = importData;
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function (e) {
      const text = e.target.result;
      const data = processCSV(text);

      // console.log(data);
      if (data) {
        fetch("https://contactmanager-10x.herokuapp.com/contact/add", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            accessToken: sessionStorage.getItem("accessToken"),
          },
          body: JSON.stringify(data),
        })
          .then((res) => res.json())
          .then((datas) => {
            setren(!ren);
            setimportDone(true);
            data = [];
          });
      }
    };
  };

  return (
    <div className="main-container">
      <div className="short-container">
        <img src="image.png" alt="logo" />
        <p className="insertfile">Insert File</p>

        <Upload.Dragger
          listType="picture"
          accept=".csv"
          action={"https://contactmanager-10x.herokuapp.com/contact/add"}
          beforeUpload={(file) => {
            // console.log(file);
            setImportData(file);
            return true;
          }}
        >
          <p className="p-tag">
            Drag & Drop a CSV File to <br /> Upload
          </p>
        </Upload.Dragger>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <button onClick={(e) => submitData(e)} className="submit">
            Submit
          </button>
          <button className="cancel" onClick={onClose}>
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImportFile;
