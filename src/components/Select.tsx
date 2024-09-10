import { ChevronDown, ChevronUp } from "lucide-react";
import { useDispatch } from "react-redux";
import {
  resetModalState,
  selectArea,
  selectCost,
  selectDistrict,
  setModalState,
} from "../redux/reducers/searchFilterReducer";

type Props = {
  title: string;
  subTitle: string;
  type: "city" | "district" | "cost" | "acreage";
  options: any[];
  selectedCode?: string;
  onChange?: (code: string) => void;
  isOpen: boolean;
};
const Select = (props: Props) => {
  const { options, title, subTitle, selectedCode, type, isOpen, onChange } =
    props;
  const dispatch = useDispatch();
  return (
    <div className="relative">
      <p className="font-bold text-sm mb-1">{title}</p>
      <div
        className="flex items-center justify-between w-48 px-3 py-2 bg-white border border-gray-300 rounded cursor-pointer"
        onClick={() =>
          isOpen ? dispatch(resetModalState()) : dispatch(setModalState(type))
        }
      >
        <span className="text-sm">
          {selectedCode &&
          options.filter((option) => option.code === selectedCode).length !== 0
            ? options.filter((option) => option.code === selectedCode)[0]
                ?.name_with_type
            : subTitle}
        </span>
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </div>
      {isOpen && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-[200px] overflow-y-auto">
          <li className="px-3 py-2 text-gray-500 border-b border-gray-200">
            {selectedCode &&
            options.filter((option) => option.code === selectedCode).length !==
              0
              ? options.filter((option) => option.code === selectedCode)[0]
                  ?.name_with_type
              : subTitle}
          </li>
          {options.map((option) => (
            <li
              key={option.code}
              className="px-3 py-2 hover:bg-blue-100 cursor-pointer text-sm"
              onClick={() => {
                dispatch(setModalState(null));
                if (type == "acreage") {
                  dispatch(selectArea(null));
                }
                if (type == "district") {
                  dispatch(selectArea(null));
                  dispatch(selectCost(null));
                }
                if (type == "city") {
                  dispatch(selectArea(null));
                  dispatch(selectCost(null));
                  dispatch(selectDistrict(null));
                }
                onChange && onChange(option.code);
              }}
            >
              {option?.name_with_type}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
