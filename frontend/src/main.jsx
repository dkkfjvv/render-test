// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import App from "./App.jsx";
// //
// import axios from "axios";
// //
// const promise = axios.get("http://localhost:3001/notes");
// console.log(promise);
// promise.then((response) => console.log("response", response));
// console.log();

// const promise2 = axios.get("http://localhost:3001/foobar");
// console.log(promise2);

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <App />
//   </StrictMode>
// );

import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
