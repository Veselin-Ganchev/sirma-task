import logo from "./logo.svg";
import "./App.css";
import CSVreader from "./components/csv-reader";

function App() {
  return (
    <CSVreader></CSVreader>
    // <div
    //   style={{
    //     width: "100%",
    //     height: "300px",
    //     border: "3px solid red",
    //     display: "flex",
    //     justifyContent: "center",
    //     alignItems: "center",
    //   }}
    //   onDragOver={(e) => {
    //     e.preventDefault();
    //   }}
    //   onDrop={(e) => {
    //     e.preventDefault();
    //     Array.from(e.dataTransfer.files).map(async (file) => {
    //       let text = await file.text();
    //       //   let result = parse(text, { header: true });
    //       console.log(text);
    //     });
    //   }}
    // >
    //   drag and drop your csv here!
    // </div>
  );
}

export default App;
