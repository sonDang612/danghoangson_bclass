import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import React, { Fragment } from "react";
import { places } from "../constants";

export default function ListRooms() {
  const { filterRooms, districts } = useSelector(
    (state: RootState) => state.searchFilter
  );

  const getDistrictByCode = React.useCallback(
    (code: string) => {
      return Object.values(districts).filter((item) => item.code === code)[0];
    },
    [districts]
  );

  function convertToMillionPerMonth(amount: number) {
    // Chuyển đổi số tiền sang đơn vị triệu
    const inMillions = amount / 1000000;

    // Làm tròn đến 2 chữ số thập phân
    const rounded = Math.round(inMillions * 100) / 100;

    // Định dạng kết quả
    return rounded.toFixed(1) + " triệu/tháng";
  }

  return (
    <div className="items-center justify-center flex mt-4">
      <div className="w-2/3">
        {filterRooms.length > 0 ? (
          filterRooms.map((item, index) => (
            <div
              key={index}
              className="flex border border-red-500 px-2 py-4 gap-3"
            >
              <img
                src={item.thumbnail}
                alt={item.thumbnail}
                className="w-[160px] object-cover cursor-pointer"
              />
              <div className="flex gap-2 flex-col">
                <p className="text-sm font-bold text-red-500 w-[85%]">
                  {item.title}
                </p>
                <span className="text-sm font-bold text-green-500">
                  {convertToMillionPerMonth(item.price)}
                </span>
                <span className="flex items-center gap-6 ">
                  <p className="text-[#8a8d91] text-sm">
                    Diện tích:{" "}
                    <span className="text-black font-bold">{item.area}m²</span>
                  </p>
                  <p className="text-[#8a8d91] text-sm">
                    Khu vực:{" "}
                    <span className="text-blue-700 font-bold">
                      {getDistrictByCode(item.district).path_with_type}
                    </span>
                  </p>
                </span>
                <p className="text-sm text-[#8a8d91]">{item.content}</p>
              </div>
            </div>
          ))
        ) : (
          <Fragment>
            <p className="text-[24px] font-bold text-center">
              Cho thuê tìm phòng trọ, nhà cho thuê, phòng trọ
            </p>
            <p className="text-md mt-2">
              Cho thuê phòng trọ, nhà trọ đăng tin cho thuê phòng trọ, tìm phòng
              trọ, hiệu quả với hơn 70.000+ tin đăng và hơn 2.000.000 lượt xem
              mỗi tháng
            </p>
            <p className="font-bold text-lg text-center mt-5">
              Khu vực nổi bật
            </p>
            <div className="flex items-center justify-center gap-5">
              {places.map((place) => (
                <div className="cursor-pointer bg-white rounded-md shadow-md hover:text-red-500 mt-2">
                  <img
                    className="w-[220px] h-[110px] object-cover rounded-md"
                    src={place.url}
                    alt={place.url}
                  />
                  <p className="px-[10px] py-[12px] text-[14px] text-[#1266dd] font-bold text-center">
                    Phòng trọ {place.title}
                  </p>
                </div>
              ))}
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
}
