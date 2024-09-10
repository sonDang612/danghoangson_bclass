import { Link, Route, Routes } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import { publicRoutes, routeNames } from "./routes";

function App() {
  return (
    <Fragment>
      <Link to={routeNames.TOPIC_1}>topic1</Link>
      <Link to={routeNames.TOPIC_2}>topic1</Link>
      <Routes>
        {publicRoutes.map((item, key) => (
          <Route {...item} key={key} />
        ))}
      </Routes>
    </Fragment>
  );
}

export default App;
