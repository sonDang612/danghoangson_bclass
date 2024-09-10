import ListRooms from "../components/ListRooms";
import SearchFilter from "../components/SearchFilter";

export default function Topic1() {
  return (
    <div className="h-screen search-filter-container">
      <SearchFilter />
      <ListRooms />
    </div>
  );
}
