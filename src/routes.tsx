import Topic1 from "./pages/Topic1";
import Topic2 from "./pages/Topic2";

export const publicRoutes = [
  { path: "topic1", element: <Topic1 /> },
  { path: "topic2", element: <Topic2 /> },
];

export const routeNames = {
  TOPIC_1: "topic1",
  TOPIC_2: "topic2",
};
