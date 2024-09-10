import { Link, Route, Routes } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import { publicRoutes, routeNames } from "./routes";
import Nav from "./components/Nav";

function App() {
  return (
    <Fragment>
      <Nav />
      <Routes>
        {publicRoutes.map((item, key) => (
          <Route {...item} key={key} />
        ))}
      </Routes>
    </Fragment>
  );
}

export default App;
