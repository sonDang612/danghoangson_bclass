import { Link } from "react-router-dom";
import { routeNames } from "../routes";

export default function Nav() {
  return (
    <div className="items-center justify-center flex">
      <p className="text-lg text-black">Đặng Hoàng Sơn: </p>
      <div className="flex gap-5 m-2 items-center justify-center">
        <Link
          to={routeNames.TOPIC_1}
          className="underline text-blue-500 font-bold text-lg"
        >
          Bài 1
        </Link>
        <Link
          to={routeNames.TOPIC_2}
          className="underline text-blue-500 font-bold text-lg"
        >
          Bài 2
        </Link>
      </div>
    </div>
  );
}
