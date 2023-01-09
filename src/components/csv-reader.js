import React, { useState } from "react";
import { parse } from "papaparse";
import Result from "./result";
import moment from "moment";

const CSVreader = () => {
  const [btnState, setBtnState] = useState(true);
  const [file, setFile] = useState();
  const [csvData, setCsvData] = useState();
  const reader = new FileReader();
  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
    setBtnState(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    reader.readAsText(file);
    if (file) {
      reader.onload = function (e) {
        let csvRes = parse(e.target.result, {
          header: true,
          skipEmptyLines: true,
        });

        const filteredcsvData = filterProjEmpl(csvRes.data);

        daysWorked(filteredcsvData);
        filterProjEmpl(csvRes.data);
      };
    }
  };

  /* filter the employees that worked on the same project */
  const filterProjEmpl = (data) => {
    const lookup = data.reduce((a, e) => {
      a[e.ProjectID] = ++a[e.ProjectID] || 0;
      return a;
    }, {});
    const workedOnSameProj = data.filter((e) => lookup[e.ProjectID]);
    return workedOnSameProj;
  };

  /* get sum of days worked on project */
  const daysWorked = (data) => {
    data.map((el) => {
      let start = moment(el.DateFrom);
      let end;
      if (el.DateTo === "null") {
        end = moment(moment().format("YYYY-MM-DD"));
      } else {
        end = moment(el.DateTo);
      } 
      console.log(end.diff(start, "days"));
    });
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Import your CSV here</h1>
      <form>
        <input type={"file"} accept={".csv"} onChange={handleOnChange} />
        <button
          disabled={btnState}
          onClick={(e) => {
            submitHandler(e);
          }}
        >
          IMPORT CSV
        </button>
      </form>

      <Result></Result>
    </div>
  );
};

export default CSVreader;
