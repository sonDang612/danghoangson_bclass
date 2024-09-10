import { Link, Route, Routes } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import { publicRoutes, routeNames } from "./routes";

function App() {
  return (
    <Fragment>
      <div className="flex gap-5 m-2">
        <Link to={routeNames.TOPIC_1} className="underline text-blue-500">
          Bài 1
        </Link>
        <Link to={routeNames.TOPIC_2} className="underline text-blue-500">
          Bài 2
        </Link>
      </div>
      <Routes>
        {publicRoutes.map((item, key) => (
          <Route {...item} key={key} />
        ))}
      </Routes>
    </Fragment>
  );
}

export default App;
