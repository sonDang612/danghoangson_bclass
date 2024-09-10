import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.css";
import "./styles/responsive.css";
import { Provider } from "react-redux";

import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
