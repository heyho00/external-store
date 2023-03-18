import * as ReactDOM from "react-dom/client";

import App from "./App";

function index() {
  const element = document.getElementById("app");

  if (!element) {
    return;
  }

  const root = ReactDOM.createRoot(element);
  root.render(<App />);
}

index();
