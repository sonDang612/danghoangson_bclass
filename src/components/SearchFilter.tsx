import { useDispatch, useSelector } from "react-redux";
import Select from "./Select";
import { RootState } from "../redux/store";
import React from "react";
import {
  fetchCities,
  fetchDistricts,
  fetchRooms,
  selectArea,
  selectCity,
  selectCost,
  selectDistrict,
  setFilterRoom,
} from "../redux/reducers/searchFilterReducer";

export default function SearchFilter() {
  const {
    cities,
    cityLoadingStatus,
    districtLoadingStatus,
    districts,
    selectedDistrict,
    selectedCity,
    modalState,
    rooms,
    selectedCost,
    selectedArea,
    fetchPropertyListings,
  } = useSelector((state: RootState) => state.searchFilter);
  const dispatch = useDispatch<any>();

  React.useEffect(() => {
    if (cityLoadingStatus === "idle") dispatch(fetchCities());
    if (districtLoadingStatus === "idle") dispatch(fetchDistricts());
    if (fetchPropertyListings === "idle") dispatch(fetchRooms());
  }, [cityLoadingStatus, dispatch, districtLoadingStatus]);

  const onFilter = () => {
    if (!selectedArea || !selectedCity || !selectedDistrict || !selectedCost) {
      alert("Vui lòng chọn dủ!!!!");
    }
    dispatch(
      setFilterRoom({
        area: selectedArea,
        city: selectedCity,
        district: selectedDistrict,
        price: selectedCost,
      })
    );
  };

  const onDeleteFilter = () => {
    dispatch(selectArea(null));
    dispatch(selectCity(null));
    dispatch(selectCost(null));
    dispatch(selectDistrict(null));
    dispatch(
      setFilterRoom({ area: null, city: null, district: null, price: null })
    );
  };

  const handleCityChange = (cityCode: string) => {
    dispatch(selectCity(cityCode));
    dispatch(selectDistrict(null));
  };

  const handleDistrictChange = (districtCode: string) => {
    dispatch(selectDistrict(districtCode));
  };

  const handleCostChange = (cost: string) => {
    dispatch(selectCost(Number.parseInt(cost)));
  };

  const handleAreaChange = (area: string) => {
    dispatch(selectArea(Number.parseInt(area)));
  };

  const filterDistricts = React.useMemo(() => {
    if (!districts) return [];
    return Object.values(districts).filter(
      (district) => district.parent_code === selectedCity
    );
  }, [districts, selectedCity]);

  const filterCities = React.useMemo(() => {
    return Object.values(cities);
  }, [cities]);

  const filterCost = React.useMemo(() => {
    return rooms
      .filter(
        (item) =>
          item.city == selectedCity && item.district === selectedDistrict
      )
      .map((item) => ({
        code: item.price.toString(),
        name_with_type: item.price.toLocaleString("vi", {
          style: "currency",
          currency: "VND",
        }),
      }));
  }, [selectedCity, selectedDistrict]);

  const filterAreas = React.useMemo(() => {
    return rooms
      .filter(
        (item) =>
          item.city === selectedCity &&
          item.district === selectedDistrict &&
          item.price === selectedCost
      )
      .map((item) => ({
        code: item.area.toString(),
        name_with_type: item.area,
      }));
  }, [selectedCity, selectedDistrict, selectedCost, selectedArea]);

  return (
    <div className="flex bg-yellow-300 p-3 gap-2 search-filter-container items-end justify-center">
      <Select
        title="Tỉnh thành"
        isOpen={modalState === "city"}
        type="city"
        subTitle="-- Tỉnh/thành --"
        options={filterCities}
        onChange={handleCityChange}
        selectedCode={selectedCity || undefined}
      />
      <Select
        title="Quận huyện"
        type="district"
        isOpen={modalState === "district"}
        subTitle="-- Quận/huyện --"
        options={filterDistricts}
        selectedCode={selectedDistrict || undefined}
        onChange={handleDistrictChange}
      />
      <Select
        title="Khoảng giá"
        isOpen={modalState === "cost"}
        type="cost"
        subTitle="Chọn mức giá"
        options={filterCost}
        onChange={handleCostChange}
        selectedCode={selectedCost?.toString()}
      />

      <Select
        title="Diện tích"
        isOpen={modalState === "acreage"}
        type="acreage"
        subTitle="Chọn diện tích"
        options={filterAreas}
        onChange={handleAreaChange}
        selectedCode={selectedArea?.toString()}
      />
      <div
        className="text-white bg-yellow-500 h-fit px-3 py-2 rounded-md cursor-pointer"
        onClick={onFilter}
      >
        <p>Lọc tin</p>
      </div>

      <div
        className="text-white bg-red-500 h-fit px-3 py-2 rounded-md cursor-pointer"
        onClick={onDeleteFilter}
      >
        <p>Xoá lọc</p>
      </div>
    </div>
  );
}
